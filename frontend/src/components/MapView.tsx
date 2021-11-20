/**
 * Map view
 * @returns
 */

import styled from "@emotion/styled";
import { MapLayouts, MapTheme, MapTypes, UserCustomizations } from "../api/themes";
import { MapFrame } from "./frames/Frame";
import { CelestialFullBackground } from "./layouts/celestial/CelestialFullBackground";
import { CelestialCircle } from "./layouts/celestial/CelestialCircle";
import { CelestialHalf } from "./layouts/celestial/CelestialHalf";
import { StreetMapDefault } from "./layouts/streetmaps/StreetMapDefault";
import { SimpleVector } from "./layouts/vector/SimpleVector";

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
  height: calc(100vh - 64px);
  text-align: center;
`;

interface MapViewProps {
  theme: Partial<MapTheme>;
  custom?: UserCustomizations;
  width?: number;
  height?: number;
  print?: boolean;
  layout?: MapLayouts,
  maptype?: MapTypes;
}

let layouts = {
  "celestial": {
    "CelestialFullBackground": CelestialFullBackground,
    "CelestialCircle": CelestialCircle,
    "CelestialHalf": CelestialHalf
  },
  "streetmap": {
    "StreetMapDefault": StreetMapDefault
  },
  "vector": {
    "SimpleVector": SimpleVector
  }
}

export function MapView(props: MapViewProps) {
  let height = props.height || 855;
  let width = props.width || 590;
  let print = props.print;
  let layout = props.layout || "CelestialCircle";
  let maptype = props.maptype || "celestial";


  if (props.theme.data?.layout) {
    layout = props.theme.data?.layout
  }
  if (props.theme.data?.maptype) {
    maptype = props.theme.data?.maptype
  }

  let orientation: "portrait" | "landscape" = (height > width) ? "portrait" : "landscape";

  // @ts-expect-error
  let Layout = layouts[maptype][layout];

  if (!Layout) {
    return <div>Выберите другую карту</div>
  }

  let RenderedLayout = <Layout {...props} orientation={orientation} width={width} custom={props.custom} height={height} print={print}></Layout>

  if (!print) {
    return (
      <CardArea className="card-area" style={{maxWidth: "100vw"}}>
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



