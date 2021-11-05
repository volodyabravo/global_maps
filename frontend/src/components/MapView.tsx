/**
 * Map view
 * @returns
 */

import { useState } from "react";
import { CelestialReact } from "./CelestialForeign";
import styled from "@emotion/styled";
import { MapTheme } from "../api/themes";
import { MapFrame } from "./frames/Frame";
import { Typography } from "@mui/material";

const CardArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding-top: 2em; */
    height: calc(100vh - 64px);
`;

const CardContainer = styled.div`
    position: relative;
    overflow: hidden;
    
  
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
    /* two */
    /* width: 850px;
height: 850px;
left: -130px;
top: -180px;
position: absolute; */


/* One */
/* width: 1200px;
height: 1184px;
left: -305px;
top: -175px;
position: absolute; */
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
  width?: string;
  height?: string;
  print?: boolean
}


export function MapView({ theme, custom, height = "855px", width = "590px", print = false }: MapViewProps) {
  const [state, setstate] = useState("#fff");

  // Think about headlines
  let headline = ((typeof custom?.headline) !== "undefined") ? custom?.headline : theme.data?.cardSettings?.defaultText.headline
  let divider = ((typeof custom?.divider) !== "undefined") ? custom?.divider : theme.data?.cardSettings?.defaultText.divider
  let tagline = ((typeof custom?.tagline) !== "undefined") ? custom?.tagline : theme.data?.cardSettings?.defaultText.tagline
  let subline = ((typeof custom?.subline) !== "undefined") ? custom?.subline : theme.data?.cardSettings?.defaultText.subline

  console.log(typeof custom?.headline, custom?.headline, theme.data?.cardSettings?.defaultText.headline, headline)



  let Card = <CardContainer className="card-container" style={{
    width: width,
    height: height,
    backgroundColor: theme.data?.cardSettings?.background?.color,
    backgroundImage: theme.data?.cardSettings?.background?.image,
  }}>

    <MapContainer className="map-container" >
      {theme?.data?.celestial && <CelestialReact zoom={0} config={{
        ...theme.data.celestial,
      }} />}
    </MapContainer>
    <CardTextContainer className="text-container">
      {headline && <Typography {...theme.data?.cardSettings?.fonts?.headline}  >{headline}</Typography>}
      {divider && <Typography {...theme.data?.cardSettings?.fonts?.divider} >{divider}</Typography>}
      {tagline && <Typography {...theme.data?.cardSettings?.fonts?.tagline} >{tagline}</Typography>}
      {subline && <Typography {...theme.data?.cardSettings?.fonts?.subline}>{subline}</Typography>}
    </CardTextContainer>
  </CardContainer>

  if (!print) {
    Card = <CardArea className="card-area">
      <MapFrame {...theme.data?.frameSettings} >
        {Card}
      </MapFrame>
    </CardArea>
  }

  return (
    Card
  );
}
