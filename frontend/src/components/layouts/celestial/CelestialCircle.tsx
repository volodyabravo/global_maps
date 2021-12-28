import { useState } from "react";
import { CelestialReact } from "../../CelestialForeign";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { CelestialMapView } from "../../MapView";


export function CelestialCircle({ orientation, theme, custom, height, print, width }: CelestialMapView) {

  let headline = ((typeof custom?.headline) !== "undefined") ? custom?.headline : theme.data?.cardSettings?.defaultText?.headline
  let divider = ((typeof custom?.divider) !== "undefined") ? custom?.divider : theme.data?.cardSettings?.defaultText?.divider
  let tagline = ((typeof custom?.tagline) !== "undefined") ? custom?.tagline : theme.data?.cardSettings?.defaultText?.tagline
  let subline = ((typeof custom?.subline) !== "undefined") ? custom?.subline : theme.data?.cardSettings?.defaultText?.subline

  let Card = <CardContainer className="card-container" style={{
    width: width + "px",
    height: height + "px",
    backgroundColor: theme.data?.cardSettings?.background?.color,
    backgroundImage: theme.data?.cardSettings?.background?.image,
  }}>

    <MapContainer className="map-container"  >
      {theme?.data?.celestial && <CelestialReact zoom={0} custom={custom} config={{
        ...theme.data.celestial,
      }} />}
    </MapContainer>
    <CardTextContainer className="text-container" style={
      theme.data?.cardSettings?.textContainer
    }>
      {headline && <Typography {...theme.data?.cardSettings?.fonts?.headline}  >{headline}</Typography>}
      {divider && <Typography {...theme.data?.cardSettings?.fonts?.divider} >{divider}</Typography>}
      {tagline && <Typography {...theme.data?.cardSettings?.fonts?.tagline} >{tagline}</Typography>}
      {subline && <Typography {...theme.data?.cardSettings?.fonts?.subline}>{subline}</Typography>}
    </CardTextContainer>
  </CardContainer>

  return Card
}

const CardArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding-top: 2em; */
  height: calc(100vh - 64px);
`;
const CardContainer = styled.div`
    position: relative;
    display:flex;
    flex-direction:column;
    overflow: hidden;
    text-align:center;
`;
const CardTextContainer = styled.div`
  bottom: 0; right: 0; left: 0;
  padding: 15px;
`;

const MapContainer = styled.div`
    flex-grow: 1;
    overflow: hidden;
`;