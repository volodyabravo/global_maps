import React, { useEffect, useRef } from "react";

import { get } from "lodash";
import { UserCustomizations } from "../api/themes";

const hour2CelestialDegree = (ra: number) =>
  ra > 12 ? (ra - 24) * 15 : ra * 15;

const sanitize = (config: CelestialOptions) => ({
  ...config,
  center: config &&
    config.center && [
      hour2CelestialDegree(config.center[0]),
      config.center[1],
      config.center[2] || 0,
    ],
});


// Modify config
const baseConfig: CelestialOptions = {
  datapath: "/celestialdata/",
  center: [0, 0, 0],
  controls: false
}
interface CelestialReactProps {
  config: CelestialOptions;
  zoom: number;
  custom?: UserCustomizations;
  onLocationChange?: (location: Array<number>) => void;
}



export class CelestialReact extends React.Component<
  CelestialReactProps
> {
  celestial: CelestialObject;
  featuresCollections: Array<any>;
  containerMounted?: number;
  updateConfigTimer: NodeJS.Timeout | null = null;
  custom?: UserCustomizations;
  containerRef = React.createRef<HTMLDivElement>();
  FeaturesCollection: any = CelestialFeaturesCollection;
  Point: any = CelestialComponentPoint;
  sizeChanged = false;

  constructor(props: CelestialReactProps) {
    super(props);
    this.featuresCollections = [];
    this.custom = props.custom;
    // Callback to get map position
    if (props.onLocationChange != undefined) {
      Celestial.addCallback(() => {
        // @ts-ignore
        props.onLocationChange(Celestial.rotate());
      })
    }

  }

  addFeaturesCollection = (fc: any) => this.featuresCollections.push(fc);

  componentDidMount = () =>
    setTimeout(() => {
      this.containerMounted = new Date().getTime();
      this.featuresCollections.forEach((fc) => fc(Celestial));
      const { config, zoom, custom } = this.props;

      const mergedConfig = ApplyCustomToConfig({
        ...baseConfig,
        ...config,
      }, custom)

      Celestial.display(mergedConfig);
      if (zoom > 0) {
        this.zoom(zoom);
      }
    }, 500);

  zoom = (ratio?: number) => Celestial.zoomBy(ratio);

  zoomTo = (level: number) => this.zoom(level / this.zoom());

  updateConfig = (
    prevConfig: CelestialOptions,
    nextConfig: CelestialOptions
  ) => {
    if (this.updateConfigTimer) {
      clearTimeout(this.updateConfigTimer);
    }
    this.updateConfigTimer = setTimeout(() => {
      this.updateConfigTimer = null;

      const basedConfig = {
        ...baseConfig,
        ...nextConfig
      }

      // Move map if location has changed
      if (get(prevConfig, "center") != get(nextConfig, "center")) {
        if (nextConfig.center) {
          Celestial.rotate({ center: nextConfig.center })
        }
      }
      if (
        get(prevConfig, "stars.data") != get(nextConfig, "stars.data") ||
        get(prevConfig, "dsos.data") != get(nextConfig, "dsos.data") ||
        // get(prevConfig, "width") != get(nextConfig, "width") ||
        get(prevConfig, "projection") != get(nextConfig, "projection")
      ) {
        Celestial.reload(sanitize(basedConfig));
      } else {
        Celestial.apply(sanitize(basedConfig));
      }
      console.log("Update runs")
    }, 1000);
  };

  componentWillUnmount = () => {
    Celestial.clear();
    Celestial.remove();
    console.log("Map unmounted")
  }

  shouldComponentUpdate = (nextProps: CelestialReactProps) => {
    const { config, zoom, custom } = this.props;
    if (nextProps.config != config || custom != this.custom) {
      const next = ApplyCustomToConfig(nextProps.config, nextProps.custom);
      this.updateConfig(config, next);
    }

    // Size changed
    if ((custom?.orientation != nextProps.custom?.orientation) || (custom?.sizeId != nextProps.custom?.sizeId)) {
     
      console.log("size changed")
      this.sizeChanged = true;
      return true;
    }
    // False because we don't want it to be recreated all the time
    return false;
  };


  componentDidUpdate = () => {
    // Size change detected = update width
    if (this.sizeChanged) {
      if (this.containerRef) {
        const containerHeight = this.containerRef.current?.parentElement?.clientHeight

        const containerWidth= this.containerRef.current?.parentElement?.clientWidth
        console.log(this.containerRef.current?.parentElement)
        console.log(this.containerRef.current?.parentElement?.offsetHeight)
        console.log(this.containerRef.current?.parentElement?.clientHeight)
        
        const basedConfig = {
          ...baseConfig,
          ...this.props.config,
        }

        if (containerHeight && containerWidth) {
          basedConfig.width = Math.min(containerHeight,containerWidth);
        }

        // Celestial.clear();
        // Celestial.remove();
        Celestial.display(sanitize(basedConfig))
        // Celestial.reload(sanitize(basedConfig));
        // Celestial.redraw();
        this.sizeChanged = false;
      }
    }

  }



  render = () => (
    <div id="celestial-map" style={{ pointerEvents: "none", maxHeight: "100%", maxWidth: "100%" }} ref={this.containerRef}>
      {React.Children.map(this.props.children, (c: any) =>
        React.cloneElement(c, {
          addFeaturesCollection: this.addFeaturesCollection,
        })
      )}
    </div>
  );
}

function ApplyCustomToConfig(config: CelestialOptions, custom?: UserCustomizations): CelestialOptions {
  if (!custom) return config;

  if (custom.location) {
    config.center = [custom.location.lng, custom.location.lat, 0]
  }


  return config;
}

interface CelestialFeaturesCollectionProps {
  addFeaturesCollection: (func: any) => void;
  children: React.ReactNode;
  objectsClass: string;
  symbolStyle: string;
  textStyle: string;
}

class CelestialFeaturesCollection extends React.PureComponent<CelestialFeaturesCollectionProps> {
  features: Array<any>;

  constructor(props: any) {
    super(props);
    this.features = [];
  }

  addFeature = (feature: any) => this.features.push(feature);

  componentDidMount = () => {
    this.props.addFeaturesCollection(this.addToCelestial);
  };

  addToCelestial = (celestial: CelestialObject) =>
    celestial.add({
      type: "raw",
      callback: () => this.celCallback(celestial),
      redraw: () => this.celRedraw(celestial),
    });

  celCallback = (celestial: CelestialObject) => {
    const json = {
      type: "FeatureCollection",
      features: this.features,
    };

    // @ts-ignore
    celestial.container
      // @ts-ignore
      .selectAll(`.${this.props.objectsClass}`)
      .data(json.features)
      .enter()
      .append("path")
      .attr("class", this.props.objectsClass);
    celestial.redraw();
  };

  celRedraw = (celestial: CelestialObject) => {
    // Select the added objects by class name as given previously
    // @ts-ignore
    celestial.container.selectAll(`.${this.props.objectsClass}`).each((d) => {
      // If point is visible (this doesn't work automatically for points)
      // @ts-ignore
      if (celestial.clip(d.geometry.coordinates)) {
        // get point coordinates
        // @ts-ignore
        const pt = celestial.mapProjection(d.geometry.coordinates);
        // object radius in pixel, could be varable depending on e.g. magnitude
        // @ts-ignore
        const r = this.props.absoluteSize
          ? d.properties.size
          : Math.pow(parseInt(d.properties.size) * 0.25, 0.5);
        // draw on canvas
        // Set object styles
        // @ts-ignore
        celestial.setStyle(this.props.symbolStyle);
        // Start the drawing path
        celestial.context.beginPath();
        // Thats a circle in html5 canvas
        celestial.context.arc(pt[0], pt[1], r, 0, 2 * Math.PI);
        // Finish the drawing path
        celestial.context.closePath();
        // Draw a line along the path with the prevoiusly set stroke color and line width
        celestial.context.stroke();
        // Fill the object path with the prevoiusly set fill color
        celestial.context.fill();
        // Set text styles
        celestial.setTextStyle(this.props.textStyle);
        // and draw text on canvas
        celestial.context.fillText(d.properties.name, pt[0] + r, pt[1] + r);
      }
    });
  };

  render = () =>
    React.Children.map(this.props.children, (c: any) =>
      React.cloneElement(c, { addFeature: this.addFeature })
    );
}

interface CelestialComponentPointProps {
  ra: number;
  dec: number;
  id: number;
  addFeature: (params: any) => void;
}

class CelestialComponentPoint extends React.Component<CelestialComponentPointProps> {
  componentDidMount = () => {
    const { ra, dec, id, ...properties } = this.props;
    this.props.addFeature({
      type: "Feature",
      id,
      properties,
      geometry: {
        type: "Point",
        coordinates: [hour2CelestialDegree(ra), dec],
      },
    });
  };
  render = () => null;
}