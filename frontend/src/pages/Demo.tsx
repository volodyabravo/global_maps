
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { getThemes, MapTheme, UserCustomizations } from "../api/themes";
import { MapView } from "../components/MapView";

export function Demo() {
    const [themes, setThemes] = useState<Array<MapTheme>>([]);
    const [custom, setCustom] = useState<UserCustomizations | undefined>(undefined);

    const router = useParams<{
        width: string,
        height: string,
        theme: string
    }>();

    let theme = useMemo(() => { return themes.find((theme) => theme.id == custom?.theme) }, [custom?.theme]);
    
    // theme = {
    //     data: {
    //         layout: "SimpleVector",
    //         maptype: "vector"
    //     },
    //     name: "demo",
    //     id:1,
    //     product: 2,
    //     preview: ""
    // };

    useEffect(() => {
        (async () => {
            let themesData = await getThemes({});
            setThemes(themesData);
            setCustom({
                divider: "Разделитель",
                headline: "Заголовок",
                subline: "Саблайн",
                tagline: "Теглайн",
                orientation: "portrait",
                theme: parseInt(router.theme)
            })

            // adds custom to the thing
            // @ts-ignore
            window.setCustom = setCustom;
        })();
        return () => {
            //cleanup
        }
    }, [])
    
    return <div style={{border: "2px solid black", width: router.width+"px"}}>
        {custom && theme &&
            <MapView layout="SimpleVector" theme={theme} custom={custom} print width={parseInt(router.width)} height={parseInt(router.height)} />}
    </div >
}