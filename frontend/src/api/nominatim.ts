export interface OSMAddress {
    isolated_dwelling: string;
    municipality: string;
    county: string;
    state: string;
    region: string;
    postcode: string;
    country: string;
    country_code: string;
}
export interface OSMPlace {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    boundingbox: Array<string>;
    lat: string;
    lon: string;
    display_name: string;
    place_rank: number;
    category: string;
    type: "hamlet" | "city" | "neighbourhood";
    importance: number;
    icon: string;
    address: OSMAddress
}
export async function FindPlaces(cityname: string): Promise<Array<OSMPlace>> {
    let params = new URLSearchParams({
        country: "Russia",
        format: "jsonv2",
        addressdetails: "1",
        city: cityname,
        limit: "6"
    })
    let request = await fetch("https://nominatim.openstreetmap.org/search?" + params);

    if (request.ok) {
        let json = await request.json()
        return json;
    }

    return []
}