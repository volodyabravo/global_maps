import axios from "axios";
import { CelestialOptions } from "d3-celestial/celestial";

export type MapLayouts = "CelestialFullBackground" | "СelestialCircle" | "CelestialHalf" | "StreetMapDefault" | "SimpleVector";
export type MapTypes = "celestial" | "streetmap" | "vector";

export const instance = axios.create({
    baseURL: '/api/',
    timeout: 8000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export enum MapType {
    Star = 1,
    Street = 2,
    Vector = 3
}

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
    orientation: "portrait" | "landscape";
    // Map properties
    location?: {
        lng: number;
        lat: number;
        cityName?: string;
    };
    date?: Date;
    zoom?: number;

    // Ids of variants
    version?: Array<number>;
}

export interface MapTheme {
    name: string;
    product: number;
    preview?: string;
    data: MapThemeData;
    id: number;
}


export async function getThemes({ map_type }: {
    map_type?: MapType
}): Promise<Array<MapTheme>> {
    const params = new URLSearchParams();
    map_type && params.set("map_type", map_type.toString())

    const request = await instance.get("themes?" + params);


    if (request.status !== 200) {
        throw Error("Server did not return any themes");
    }
    const json = await request.data;
    return json;

}

export interface Size {
    version: number,
    name: string,
    height: number,
    width: number,
    height_px: number,
    width_px: number,
    id: number
}

export async function getSizes(): Promise<Array<Size>> {
    const request = await instance.get("sizes/");
    if (request.status !== 200) {
        throw Error("Server did not return any sizes");
    }
    const json = await request.data;

    return json;
}



export interface Version {
    name: string;
    image: string;
    id: number;
    children: Array<Version>;
    sizes: Array<Size>
    children_description: string
    custom_css: string
}

export async function getVersions(): Promise<Array<Version>> {
    const request = await instance.get("versions/");
    if (request.status !== 200) {
        throw Error("Server did not return any versions");
    }
    const json: Array<Version> = await request.data;
    return json;
}

export interface PricingOption {
    "price": string,
    "size_id": string,
    "version_id": string,
    "id": 1
}

export async function getPrices(version?: string, size?: string): Promise<Array<PricingOption>> {
    const params = new URLSearchParams();

    version && params.set("version", version)
    size && params.set("size", size)

    const request = await instance.get("prices/?" + params);

    if (request.status !== 200) {
        throw Error("Server did not return any prices");
    }

    const json = await request.data;

    return json;
}


interface CitiesResponse {
    success: boolean,
    cities: Array<{
        name: string,
        id: string,
        postalcode: string,
        region_name: string,
        short_name: string
    }>;
}

export async function getCityByName(name: string): Promise<CitiesResponse["cities"]> {
    const params = new URLSearchParams({ city: name });
    const request = await instance.get("delivery/get_cities/?" + params);

    if (request.status !== 200) {
        throw Error("Server did not return any prices");
    }

    const json: CitiesResponse = await request.data;

    return json.cities;
}
export interface getCityPvzParams {
    delivery: {
        delivery_city_id: string
        delivery_type_name?: string,
        delivery_type_id?: string,
        delivery_city_name?: string,
        delivery_region?: string,
        delivery_address?: string,
        delivery_street?: string,
        delivery_entrance?: string,
        delivery_floor?: string,
        delivery_apartments?: string,
        pvz_id?: string;
    },
    products: Array<APIProduct>;
    personal?: {
        name?: string,
        surname?: string,
        email?: string,
        phone?: string,
        comment?: string,
        promocode?: string,
        emails_agree?: boolean,
        call_back?: boolean
    }
}

export interface APIProduct {
    product_customization: {
        theme?: number,
        headline?: string,
        divider?: string,
        tagline?: string,
        subline?: string,
        sizeId?: number,
        orientation?: "portrait" | "landscape",
        location?: {
            lng?: number,
            lat?: number,
            cityName?: string
        },
        date?: Date,
        zoom?: number,
        version?: Array<number>,
        vector?: {
            color_id?: number,
            image_id?: number
        }
    }
}

export interface PVZ {
    /**
     * ул. Международная, 15
     */
    address: string
    /**
     * "Выход из метро к БЦ Голден Гейт , 300 м прямо по ул. Международная"
     */
    address_description: string
    city: string
    /**
     * delivery days
     */
    delivery_days: number
    /**
     * method id
     */
    delivery_method_id: string
    /**
     * method name
     */
    delivery_method_name: string
    /**
     * price in rub
     */
    delivery_price: number
    /**
     * id
     */
    id: string
    latitude: number
    longitude: number
    metro_id: number | null
    /**
     * ул. Международная, 15
     */
    payments: { online: boolean, cash: boolean, card: boolean }
    /**
     * +79104875057, +79258590365
     */
    phone: string
    /**
     * ул. Международная, 15
     */
    postalcode: number | null
    /**
     * Пн-Пт 10:00-20:00, Сб-Вс 10:00-18:00
     */
    schedule: string
    /**
     * ул. Международная, 15
     */
    type: "postamat" | "pvz"
}

export async function getCityPvz(data: getCityPvzParams): Promise<PVZ[]> {
    const request = await instance.post("delivery/get_city_pvz/", data);

    if (request.status !== 200) {
        throw Error("Server did not return any prices");
    }

    const json = await request.data;

    // Convert to an array
    const props = Object.entries(json)
    const array = props.map((prop) => prop[1]) as PVZ[]

    return array;
}

export interface DeliveryMethodInfo {

    delivery_days: number
    delivery_price: number
    id: string,
    name: string
    payments: {
        card: boolean | null
        cash: boolean | null
        online: boolean | null
    }
    type: "courier" | "pvz"
}

export async function getCityDeliveryMethods(data: getCityPvzParams): Promise<Array<DeliveryMethodInfo>> {
    const request = await instance.post("delivery/get_delivery_methods_by_city/", data);

    if (request.status !== 200) {
        throw Error("Server did not return any prices");
    }

    const json = await request.data;

    // Convert to an array
    const props = Object.entries(json)
    const array = props.map((prop) => prop[1]) as Array<DeliveryMethodInfo>
    return array;
}


export async function createOrder(data: getCityPvzParams): Promise<{
    amount: number
    email: string
    name: string
    order: number
    phone: string
    url?: string
}> {
    const request = await instance.post("order/create/", data)

    if (request.status !== 200) {
        throw Error("Server did not return any prices");
    }

    const json = await request.data;
    return json;
}

export async function getOrder(orderId: string): Promise<{
    amount: number
    email: string
    name: string
    order: number
    phone: string
    url?: string
}> {
    const request = await instance.get("order/order_get/?order_id=" + orderId);

    if (request.status !== 200) {
        throw Error("Server did not return any prices");
    }

    const json = await request.data;
    return json;
}
