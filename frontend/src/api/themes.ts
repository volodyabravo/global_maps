import { CelestialOptions } from "d3-celestial/celestial";

export type MapLayouts = "CelestialFullBackground" | "СelestialCircle" | "CelestialHalf" | "StreetMapDefault" | "SimpleVector";
export type MapTypes = "celestial" | "streetmap" | "vector";

export interface FontSettings {
    color?: string;
    fontWeight?: number;
    fontFamily?: string;
    padding?: string;
    fontSize?: string;
    paddingBottom?: string;
    letterSpacing?: string;
}

export interface FrameSettings {
    padding?: string;
    color?: string;
}

export interface MapboxProps {
    style: string;
}

export interface MapThemeData {
    celestial?: CelestialOptions;
    mapbox?: MapboxProps;
    celestialOverlay?: {
        opacity?: number;
        background: string;
    }
    /**
     * Settings for the card
     */
    cardSettings?: {
        background?: {
            color?: string;
            image?: string;
        }
        fonts?: {
            headline?: FontSettings
            divider?: FontSettings;
            tagline?: FontSettings;
            subline?: FontSettings;
        }
        defaultText: {
            headline?: string
            divider?: string;
            tagline?: string;
            subline?: string;
        }
        textContainer: {
            background: string;
            padding: string;
            margin: string;
            opacity: number;
        }
    }
    // Turn on and turn off fields in the client UI
    fields?: {
        headline?: boolean;
        divider?: boolean;
        tagline?: boolean;
        subline?: boolean;
    }

    /**
     * Settings for the frame
     */
    frameSettings?: FrameSettings;
    customCss?: string;
    maptype: MapTypes,
    layout: MapLayouts,
}

export interface UserCustomizations {
    theme?: number,
    headline?: string,
    divider?: string,
    tagline?: string,
    subline?: string,
    sizeId?: number,
    orientation: "portrait" | "landscape"
}

export interface MapTheme {
    name: string;
    product: number;
    preview?: string;
    data: MapThemeData;
    id: number;
}

export async function getThemes(): Promise<Array<MapTheme>> {
    let request = await fetch("/api/themes");

    if (!request.ok) {
        throw Error("Server did not return any themes");
    }
    let json = await request.json();
    return json;

}

export interface Size {
    "version": number,
    "name": string,
    "height": number,
    "width": number,
    "id": number
}

export async function getSizes(): Promise<Array<Size>> {
    let request = await fetch("/api/sizes/");
    if (!request.ok) {
        throw Error("Server did not return any sizes");
    }
    let json = await request.json();

    return json;
}

export async function getVersions(): Promise<Array<object>> {
    let request = await fetch("/api/versions");
    if (!request.ok) {
        throw Error("Server did not return any versions");
    }
    let json = await request.json();

    return json;
}



export interface PricingOption {
    "price": string,
    "size_id": string,
    "version_id": string,
    "id": 1
}

export async function getPrices(): Promise<Array<PricingOption>> {
    let params = new URLSearchParams();
    let request = await fetch("/api/prices/");

    if (!request.ok) {
        throw Error("Server did not return any prices");
    }

    let json = await request.json();

    return json;
}