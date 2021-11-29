import { useEffect, useMemo, useState } from "react";

import { getThemes, MapTheme, UserCustomizations } from "../api/themes";
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
    const [data, setData] = useState<RenderData | undefined>(undefined);
    let theme = useMemo(() => { return themes.find((theme) => theme.id == data?.custom?.theme) }, [data?.custom?.theme]);

    useEffect(() => {
        (async () => {
            let themesData = await getThemes({});
            setThemes(themesData);
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
        {data && theme &&
            <MapView theme={theme} custom={data?.custom} print height={data.height} width={data.width} />}
    </div >
}