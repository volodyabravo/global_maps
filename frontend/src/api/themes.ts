export interface MapTheme {
    name: string;
    product: number;

    preview?: string;
    data: object;
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