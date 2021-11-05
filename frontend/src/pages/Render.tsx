import { Grid } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { getThemes, MapTheme, UserCustomizations } from "../api/themes";
import { MapView } from "../components/MapView";

export function RenderPage() {
    const [themes, setThemes] = useState<Array<MapTheme>>([]);
    const [custom, setCustom] = useState<UserCustomizations | undefined>(undefined);

    let theme = useMemo(() => { return themes.find((theme) => theme.id == custom?.theme) }, [custom?.theme]);

    useEffect(() => {
        (async () => {
            let themesData = await getThemes();
            setThemes(themesData);
            // adds custom to the thing
            // @ts-ignore
            window.setCustom = setCustom;
        })();
        return () => {
            //cleanup
        }
    }, [])




    return <div>
        {custom && theme &&
            <MapView theme={theme} custom={custom} print />}
    </div >
}