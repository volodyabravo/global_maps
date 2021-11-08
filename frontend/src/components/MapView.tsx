/**
 * Map view
 * @returns
 */

import { useState } from "react";
import { CelestialReact } from "./CelestialForeign";
import styled from "@emotion/styled";
import { MapTheme, UserCustomizations } from "../api/themes";
import { MapFrame } from "./frames/Frame";
import { Typography } from "@mui/material";
import { CelestialFullBackground } from "./layouts/celestial/CelestialFullBackground";
import { CelestialCircle } from "./layouts/celestial/CelestialCircle";

export interface CelestialMapView {
  theme: Partial<MapTheme>;
  custom?: UserCustomizations;
  width: number;
  height: number;
  print?: boolean;
  orientation: "portrait" | "landscape"
}


const CardArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding-top: 2em; */
    height: calc(100vh - 64px);
`;

interface MapViewProps {
  theme: Partial<MapTheme>;
  custom?: UserCustomizations;
  width?: number;
  height?: number;
  print?: boolean;
  layout?: "CelestialFullBackground" | "СelestialCircle",
  maptype?: "celestial";
}


let layouts = {
  "celestial": {
    "CelestialFullBackground": CelestialFullBackground,
    "CelestialCircle": CelestialCircle,
  }

}

export function MapView(props: MapViewProps) {
  let height = props.height || 855;
  let width = props.width || 590;
  let print = props.print;
  let layout = props.layout || "CelestialCircle";
  let maptype = props.maptype || "celestial";


  if (props.theme.data?.layout) {
    layout=props.theme.data?.layout
  }
  if (props.theme.data?.maptype) {
    maptype=props.theme.data?.maptype
  }

  let orientation: "portrait" | "landscape" = (height > width) ? "portrait" : "landscape";

  // @ts-expect-error
  let Layout = layouts[maptype][layout];

  let RenderedLayout = <Layout {...props} orientation={orientation} width={width} custom={props.custom} height={height} print={print}></Layout>

  if (!print) {
    return (
      <CardArea className="card-area">
        <style dangerouslySetInnerHTML={{
          __html: props.theme.data?.customCss || ""
        }} />
        <MapFrame {...props.theme.data?.frameSettings} >
          {RenderedLayout}

        </MapFrame>
      </CardArea>

    );
  } else {
    return (
      <div>
        <style dangerouslySetInnerHTML={{
          __html: props.theme.data?.customCss || ""
        }} />
        {RenderedLayout}
      </div>
    );
  }


}
