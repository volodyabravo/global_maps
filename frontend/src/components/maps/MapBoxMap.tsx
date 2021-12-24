import styled from "@emotion/styled";
// Import as es6 module
// @ts-ignore
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef } from 'react';
import { UserCustomizations } from "../../api/themes";
mapboxgl.accessToken = 'pk.eyJ1Ijoidm9sb2R5YWJyYXZvIiwiYSI6ImNrbHJ5YzkwZDFyODAybnF5YjMyYXd2dHAifQ.r8osMfsMnoe89b3qJ3g8uA';

export interface MapBoxMapProps {
    style: string;
    custom?: UserCustomizations;
}

export function MapBoxMap(props: MapBoxMapProps) {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (map.current != null) return; // initialize map only once
        if (mapContainer == null) return;

        let center = {
            lat: 55,
            lon: 37
        };
        if (props.custom?.location) {
            let location = props.custom?.location;
            center = {
                lat: location.lat,
                lon: location.lng
            }
        }
        map.current = new mapboxgl.Map({
            // @ts-ignore
            container: mapContainer.current,
            style: props.style,
            center: center,
            zoom: 5,
        });

        // Patch dimensions function to return correct dimensions
        // @ts-ignore
        map.current._containerDimensions = function() {
            if (mapContainer.current) {
                let height = mapContainer.current.clientHeight;
                let width = mapContainer.current.clientWidth;
                return  [width,height] 
            }
        }

        map.current.on("load", (e:any) => {
            if (map.current) {
                map.current.resize();
                if (props.custom?.location) {
                    let location = props.custom?.location;
                    map.current?.panTo({
                        lat: location.lat,
                        lon: location.lng
                    })
                }
            }


        })
        return () => {
            map.current?.remove();
            map.current = null
        }


    }, [props.style]);


    useEffect(()=> {
        if (map.current) {
            map.current.resize();
        }

    }, [props.custom?.sizeId, props.custom?.orientation])

    useEffect(()=> {
        if (map.current && props.custom?.location) {
            map.current.panTo({
                lat: props.custom.location.lat,
                lon: props.custom?.location.lng
            })
        }

    }, [props.custom?.location?.lat, props.custom?.location?.lng])
    
    return  <MapContainer ref={mapContainer} />
}


const MapContainer = styled.div`
    /* width: 100%;
    height:100%; */
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;



    & .mapboxgl-control-container {
        display: none;

       
    } 

 

    /* & .mapboxgl-canvas {
        width:  100% !important;
        height: 100% !important;
    } */
`;
