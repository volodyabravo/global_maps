/**
 * Map view
 * @returns
 */

import { useState } from "react";
import { CelestialReact } from "./CelestialForeign";
import styled from "@emotion/styled";
import { MapTheme } from "../api/themes";

const CardArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding-top: 2em; */
    height: calc(100vh - 64px);
`;

const CardContainer = styled.div`
    position: relative;
    width: 590px;
    height: 855px;
    transform: scale(0.75);
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;
const CardTextContainer = styled.div`
    position: absolute;
   bottom: 0; right: 0; left: 0;
    /* opacity: 0.5; */
    /* background-color: black; */
    padding: 15px;
    /* width: 100%; */
`;

const MapContainer = styled.div`
    width: 500px;
    height: 500px;
    overflow: hidden;
    border-radius: 50%;
    margin: 3em auto;
    
`;

export interface UserCustomizations {
  theme?: number,
  headline?: string,
  divider?: string,
  tagline?: string,
  subline?: string,
}

interface MapViewProps {
  theme: Partial<MapTheme>;
  custom?: UserCustomizations;
}




export function MapView({ theme, custom }: MapViewProps) {
  const [state, setstate] = useState("#fff");

  return (

    <CardArea className="card-area">
      <CardContainer className="card-container" >
        <MapContainer className="map-container" >
          {theme?.data?.celestial && <CelestialReact zoom={0} config={theme.data.celestial} />}

        </MapContainer>
        <CardTextContainer className="text-container">
          {/* <Typography className="text-headline" color={backProps.headline.color} >{backProps.headline.text}</Typography>
                                <Typography className="text-divider" color={backProps.divider.color} >{backProps.divider.text}</Typography>
                                <Typography className="text-tagline" color={backProps.tagline.color} >{backProps.tagline.text}</Typography>
                                <Typography className="text-subline" color={backProps.subline.color} >{backProps.subline.text}</Typography> */}
        </CardTextContainer>
      </CardContainer>
    </CardArea>
  );
}
