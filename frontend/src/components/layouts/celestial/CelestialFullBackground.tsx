import { useState } from "react";
import { CelestialReact } from "../../CelestialForeign";
import styled from "@emotion/styled";
import { MapTheme, UserCustomizations } from "../../../api/themes";
import { MapFrame } from "../../frames/Frame";
import { Typography } from "@mui/material";
import { CelestialMapView } from "../../MapView";



export function CelestialFullBackground({ orientation, theme, custom, height, print, width }: CelestialMapView) {
  // Calculate height of the map

  const outerPadding = 300;

  const maxDimension = Math.max(height, width);
  const mapWidth = maxDimension + outerPadding;
  const mapTop = (maxDimension == height) ? -(outerPadding / 2) : (-(mapWidth - height) / 2);
  const mapLeft = (maxDimension == height) ? (-(mapWidth - width) / 2) : -(outerPadding / 2);

  const headline = ((typeof custom?.headline) !== "undefined") ? custom?.headline : theme.data?.cardSettings?.defaultText?.headline
  const divider = ((typeof custom?.divider) !== "undefined") ? custom?.divider : theme.data?.cardSettings?.defaultText?.divider
  const tagline = ((typeof custom?.tagline) !== "undefined") ? custom?.tagline : theme.data?.cardSettings?.defaultText?.tagline
  const subline = ((typeof custom?.subline) !== "undefined") ? custom?.subline : theme.data?.cardSettings?.defaultText?.subline

  const Card = <CardContainer className="card-container" style={{
    width: width + "px",
    height: height + "px",
    backgroundColor: theme.data?.cardSettings?.background?.color,
    backgroundImage: theme.data?.cardSettings?.background?.image,
  }}>

    <MapContainer className="map-container" style={
      {
        width: mapWidth,
        height: mapWidth,
        left: mapLeft + "px",
        top: mapTop + "px",
      }
    } >
      {theme?.data?.celestial && <CelestialReact zoom={1} custom={custom} config={{
        ...theme.data.celestial,
        width: mapWidth,
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

const CardContainer = styled.div`
    position: relative;
    overflow: hidden;
    text-align:center;
`;
const CardTextContainer = styled.div`
    position: absolute;
    bottom: 0; right: 0; left: 0;
`;

const MapContainer = styled.div`
    overflow: hidden;
    position: absolute;
`;

