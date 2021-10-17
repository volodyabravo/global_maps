import React, { useEffect, useRef } from "react";
// import * as d3 from 'd3-celestial/lib/d3';
import {
  Celestial,
  d3,
  CelestialOptions,
  CelestialObject,
} from "d3-celestial/celestial";
import { get } from "lodash";
import "d3-celestial/lib/d3.geo.projection.js";

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
}
interface CelestialReactProps {
  config: CelestialOptions;
  zoom: number;
}

interface CelestialReactState { }

export class CelestialReact extends React.Component<
  CelestialReactProps,
  CelestialReactState
> {
  celestial: CelestialObject;
  featuresCollections: Array<any>;
  containerMounted?: number;
  updateConfigTimer: NodeJS.Timeout | null = null;

  FeaturesCollection: any = CelestialFeaturesCollection;
  Point: any = CelestialComponentPoint;

  constructor(props: CelestialReactProps) {
    super(props);
    this.celestial = Celestial(d3);
    this.featuresCollections = [];
  }

  addFeaturesCollection = (fc: any) => this.featuresCollections.push(fc);

  componentDidMount = () =>
    setTimeout(() => {
      this.containerMounted = new Date().getTime();
      this.featuresCollections.forEach((fc) => fc(this.celestial));
      const { config, zoom } = this.props;

      this.celestial.display(sanitize({
        ...baseConfig,
        ...config,
      }));
      if (zoom > 0) {
        this.zoom(zoom);
      }
    }, 500);

  zoom = (ratio?: number) => this.celestial.zoomBy(ratio);

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
      this.celestial.apply(sanitize(nextConfig));
      if (
        get(prevConfig, "stars.data") != get(nextConfig, "stars.data") ||
        get(prevConfig, "dsos.data") != get(nextConfig, "dsos.data")
      ) {
        this.celestial.reload(sanitize(nextConfig));
      }
    }, 1000);
  };

  shouldComponentUpdate = (nextProps: CelestialReactProps) => {
    const { config, zoom } = this.props;
    if (nextProps.config != config) {
      let newConfig = {
        ...baseConfig,
        ...nextProps.config
      }
      this.updateConfig(config, newConfig);
    }

    if (config.projection != nextProps.config.projection) {
      console.log("rerender");
      this.celestial.reproject(nextProps.config);
    }
    return false;
  };

  render = () => (
    <div id="celestial-map">
      {React.Children.map(this.props.children, (c: any) =>
        React.cloneElement(c, {
          addFeaturesCollection: this.addFeaturesCollection,
        })
      )}
    </div>
  );
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
        let pt = celestial.mapProjection(d.geometry.coordinates);
        // object radius in pixel, could be varable depending on e.g. magnitude
        // @ts-ignore
        let r = this.props.absoluteSize
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