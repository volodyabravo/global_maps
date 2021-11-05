import { CelestialOptions } from "d3-celestial/celestial";


export interface FontSettings {
    color?: string;
    fontWeight?: number;
    fontFamily?: string;
    padding?: string;
    fontSize?: string;
}

export interface FrameSettings {
    padding?: string;
    color?: string;
}

export interface MapThemeData {
    celestial?: CelestialOptions;
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
    frameSettings?: FrameSettings
}

export interface UserCustomizations {
    theme?: number,
    headline?: string,
    divider?: string,
    tagline?: string,
    subline?: string,
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

export async function getSizes(): Promise<Array<object>> {
    let request = await fetch("/api/sizes");
    if (!request.ok) {
        throw Error("Server did not return any themes");
    }
    let json = await request.json();

    return json;
}

export async function getVersions(): Promise<Array<object>> {
    let request = await fetch("/api/versions");

    if (!request.ok) {
        throw Error("Server did not return any themes");
    }

    let json = await request.json();

    return json;
}