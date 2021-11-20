import styled from "@emotion/styled";
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
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
            // @ts-expect-error
            container: mapContainer.current,
            style: props.style,
            center: center,
            zoom: 5,
        });

        map.current.on("load", (e) => {
            console.log()

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
        console.log(map.current)
        return () => {
            map.current?.remove();

            map.current = null


        }


    }, [props.style, props.custom]);

    // let location = 

    return <div style={{ width: "100%", height: "100%" }}>
        <MapContainer ref={mapContainer} />
    </div>
}


const MapContainer = styled.div`
    width: 100%;
    height:100%;

    & .mapboxgl-canvas-container {
        width: 100%;
    height:100%;
    }

    & .mapboxgl-control-container {
        display: none;
    } 

    & .mapboxgl-canvas {
        width:  100% !important;
        height: 100% !important;
    }
`;
