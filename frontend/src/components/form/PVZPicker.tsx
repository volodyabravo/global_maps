import { PVZ } from "../../api/themes";
import Modal from '@mui/material/Modal';
import { createRef, useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import Fuse from 'fuse.js'
import { styled } from "@material-ui/system";





import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { PVZGeoJSON, pvzs, pvzstofeatures, pvztoarray } from "../../pages/UIVars";
import classNames from "classnames";
mapboxgl.accessToken = 'pk.eyJ1Ijoidm9sb2R5YWJyYXZvIiwiYSI6ImNrbHJ5YzkwZDFyODAybnF5YjMyYXd2dHAifQ.r8osMfsMnoe89b3qJ3g8uA';




export default function PVZPicker(props: {
  pvzs: PVZ[],
  onSelect?: (id: string) => void,
  isOpen: boolean,
  setOpen?: (state: boolean) => void
}) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const [pvz, setPvz] = useState<string | null>(null)
  // const [open, setOpen] = useState(true);
  const handleOpen = () => props.setOpen && props.setOpen(true);
  const handleClose = () => props.setOpen && props.setOpen(false);

  let features = pvzstofeatures(props.pvzs);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (mapContainer.current == null) return;

    let center = {
      lat: props.pvzs[0].latitude,
      lon: props.pvzs[0].longitude
    };
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/volodyabravo/ckwi0ckga1smj14mlctllqkf5",
      center: center,
      zoom: 11,
    });

    map.current.on("load", (e: any) => {
      console.log("lol");
      if (map.current) {
        map.current.addSource("pvzs", {
          type: "geojson",
          data: features,
          cluster: true,
          clusterMaxZoom: 14, // Max zoom to cluster points on
          clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
        })


        map.current.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'pvzs',
          filter: ['has', 'point_count'],
          paint: {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#51bbd6',
              100,
              '#f1f075',
              750,
              '#f28cb1'
            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              100,
              30,
              750,
              40
            ]
          }
        });

        map.current.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'pvzs',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
          }
        });

        map.current.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          source: 'pvzs',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': '#11b4da',
            'circle-radius': 8,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
          }
        });

        // inspect a cluster on click
        map.current.on('click', 'clusters', (e) => {
          if (map.current) {
            // @ts-ignore
            const features: PVZGeoJSON["features"] = map.current.queryRenderedFeatures(e.point, {
              layers: ['clusters']
            });
            // @ts-ignore
            const clusterId = features[0].properties.cluster_id;
            // @ts-ignore
            map.current.getSource('pvzs').getClusterExpansionZoom(
              clusterId,
              // @ts-ignore
              (err, zoom) => {
                if (err) return;
                // @ts-ignore
                map.current.easeTo({
                  // @ts-ignore
                  center: features[0].geometry.coordinates,
                  zoom: zoom
                });
              }
            );
          }

        });

        // When a click event occurs on a feature in
        // the unclustered-point layer, open a popup at
        // the location of the feature, with
        // description HTML from its properties.
        map.current.on('click', 'unclustered-point', (e) => {
          if (!map.current) return;
          // @ts-ignore
          const coordinates = e.features[0].geometry.coordinates.slice();
          // @ts-ignore
          const mag = e.features[0].properties.mag;

          // Ensure that if the map is zoomed out such that
          // multiple copies of the feature are visible, the
          // popup appears over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }


          console.log();
          // @ts-ignore
          let id = e.features[0].properties.id;
          if (id) {
            setPvz(id);
          }

          // new mapboxgl.Popup()
          //   .setLngLat(coordinates)
          //   .setHTML(
          //     `magnitude: ${mag}<br>Was there a tsunami?:=`
          //   )
          //   .addTo(map.current);
        });

        map.current.on('mouseenter', 'clusters', () => {
          if (!map.current) return;
          map.current.getCanvas().style.cursor = 'pointer';
        });
        map.current.on('mouseleave', 'clusters', () => {
          if (!map.current) return;
          map.current.getCanvas().style.cursor = '';
        });

      }
    })

    return () => {
      map.current?.remove();
      map.current = null
    }
  }, [mapContainer.current]);

  return (<div>
    <StyledModal
      open={props.isOpen}
      // open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <ModalBox>
        <div className="leftSide">
          <h2>Выбор пункта выдачи</h2>
          <PvzList>
            {props.pvzs.map((item) => {
              let selected = item.id === pvz
              return (<div className={classNames("item", {
                active: selected
              })} onClick={() => { setPvz(item.id); }}>
                <div className="title">{item.id}</div>
                <div className="address">{item.address}</div>
                <div className="deliveryandprice"><div>Срок доставки: {item.delivery_days}</div> <div>Цена: {item.delivery_price} ₽</div></div>
                {selected && <>
                  {item.address_description !== "" && <div className="addressdescription">{item.address_description}</div>}
                  <button className="actionbutton" onClick={() => {handleClose(); pvz && props.onSelect && props.onSelect(pvz)}}>выбрать пункт доставки</button>
                </>}
              </div>)
            })}
          </PvzList>
        </div>
        <div className="rightSide">
          <MapContainer className="mapboxgl-map" ref={mapContainer} />
        </div>
      </ModalBox>
    </StyledModal >
  </div>)
}

const PvzList = styled("div")`
  flex: 1;
  overflow: auto;
  min-height: 0px;
  .item {
    &.active {
      background-color: #E6EAEE;
    }

    padding: 1em;
    cursor: pointer;
    border-bottom: 0.5px solid #C3C9CF;
    .title {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      /* identical to box height, or 125% */
      color: #202945;
    }
    .address {
      margin-top: 0.75em;
      font-family: Montserrat;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 20px;
      /* or 125% */
      

      color: #202945;
    }
    .deliveryandprice {
      margin-top: 1em;
      display: flex;
      font-family: Montserrat;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 15px;
      /* identical to box height, or 125% */


      color: #202945;
      div {margin-right: 2em}
    }

    .addressdescription {
      margin-top: 1em;
      font-family: Montserrat;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 20px;
    }

    .actionbutton {
      background: #3F557F;
      padding: 20px;
      width: 100%;
      margin-top: 5px;
      border: none;
      background: #3F557F;
      border-radius: 5px;

      font-family: Montserrat;
      font-style: normal;
      font-weight: normal;
      font-size: 11px;
      line-height: 15px;
      color: #FFF;
      cursor: pointer;
    }
  }

`

const StyledModal = styled(Modal)`
  border: none;
`

const MapContainer = styled("div")`
    position: absolute; top: 0; bottom: 0; right:0; left:0;
    & .mapboxgl-canvas-container {
      width: 100%;
      height:100%;
    }

    & .mapboxgl-control-container {
      display: none;
    } 
`

const ModalBox = styled("div")`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: calc(100vw - 200px);
  height: calc(100vh - 50px);
  background-color: white;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  padding: 1em;
  display: flex;
  border-radius: 5px;
 
  .leftSide {
    display: flex;
    flex-direction: column;
    width: 450px;
    height: 100%;
    flex-flow: column;
    h2 {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 25px;
      /* or 125% */

      text-transform: uppercase;

      color: #202945;
    }
  }

  .rightSide {
    flex:1;
    overflow: hidden;
    position: relative;
  }

`

