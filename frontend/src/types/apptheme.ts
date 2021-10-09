import { CelestialOptions } from "d3-celestial/celestial";

/**
 * Types of the map
 */
export enum MapType {
    "skymap", "streetmap"
}

export interface GlobalMapsTheme {
    /**
     * Theme name
     */
    name: string,
    thumbnail?: string,

    /**
     * Type of the map
     */
    product: MapType;
    
    /**
     * Options related to starry sky (being used as a default) exists on skymap
     */
    celestial?: CelestialOptions
}