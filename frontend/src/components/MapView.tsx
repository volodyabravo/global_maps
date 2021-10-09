/**
 * Map view
 * @returns
 */

import { useState } from "react";
import { CelestialReact } from "./CelestialForeign";

export function MapView() {
  const [state, setstate] = useState("#fff");

  return (
    <div>
      <CelestialReact
        zoom={10}
        config={{
          background: {
            fill: state,
            opacity: 0.5,
          },
          width: 200,
          controls: false,
          center: [55, 55, 0],
        }}
      />
    </div>
  );
}
