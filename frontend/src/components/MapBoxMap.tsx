import styled from "@emotion/styled";
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef } from 'react';
mapboxgl.accessToken = 'pk.eyJ1Ijoidm9sb2R5YWJyYXZvIiwiYSI6ImNrbHJ5YzkwZDFyODAybnF5YjMyYXd2dHAifQ.r8osMfsMnoe89b3qJ3g8uA';

export interface MapBoxMapProps {
    style: string;
}

export function MapBoxMap(props: MapBoxMapProps) {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (map.current != null) return; // initialize map only once
        if (mapContainer == null) return;
        map.current = new mapboxgl.Map({
            // @ts-expect-error
            container: mapContainer.current,
            style: props.style,
            center: [50, 50],
            zoom: 5,
        });

        map.current.on("load", (e) => {
            console.log()
            if (map.current)
                map.current.resize();
        })
        console.log(map.current)
    }, []);

    return <div style={{ width: "100%", height: "100%" }}>
        <MapContainer ref={mapContainer} />
    </div>
}


const MapContainer = styled.div`
    width: 100%;
    height:100%;
/* 
    & .mapboxgl-canvas-container {
        width: 100%;
    height:100%;
    }

    & .mapboxgl-control-container {
        display: none;
    } */

    & .mapboxgl-canvas {
        left: 0;
    }
`;
