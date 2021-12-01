import { useEffect, useMemo, useState } from "react";

import { getSizes, getThemes, MapTheme, Size, UserCustomizations } from "../api/themes";
import { MapView } from "../components/MapView";

interface RenderData {
    height: number,
    width: number,
    deviceScaleFactor: number
    custom: UserCustomizations;
}

/**
 * Render page for puppeteer
 * @returns 
 */
export function RenderPage() {
    // TODO: Get only one theme
    const [themes, setThemes] = useState<Array<MapTheme>>([]);
    const [sizes, setSizes] = useState<Array<Size>>([]);

    const [data, setData] = useState<RenderData | undefined>(undefined);

    let theme = useMemo(() => { return themes.find((theme) => theme.id == data?.custom?.theme) }, [data?.custom?.theme]);

    let size: Size | undefined = useMemo(() => { return sizes.find((size) => size.id == data?.custom?.sizeId) }, [data?.custom?.sizeId]);

    useEffect(() => {
        (async () => {
            let themesData = await getThemes({});
            setThemes(themesData);
            let sizesData = await getSizes();
            setSizes(sizesData)

            // adds custom to the thing
            // @ts-ignore
            window.initializeMap = async (data) => {
                setData(data);
                // TODO: Request the theme and throw error if no theme found
            };


        })();
        return () => {
            //cleanup
        }
    }, [])

    return <div>
        {data && theme && sizes &&
            <MapView theme={theme} custom={data?.custom} print height={data.height} width={data.width} size={size} />}
    </div >
}