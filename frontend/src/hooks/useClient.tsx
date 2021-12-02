/**
 * This file contains all of the logic for the client editor
 */
import { useObserver } from "mobx-react";
import { useEffect, useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getSizes, getThemes, getVersions, MapTheme, MapType, Size, UserCustomizations, Version } from "../api/themes";
import { Cart, CartItem } from "../cart/cart.store";

const hasGeo = 'geolocation' in navigator;

const useClient = (cart?: Cart, mapType?: MapType) => {

    const [themes, setThemes] = useState<Array<MapTheme>>([]);
    const [sizes, setSizes] = useState<Array<Size>>([]);
    const [versions, setVersions] = useState<Array<Version>>([]);



    // Form for storing data
    const form = useForm<UserCustomizations>({
        defaultValues: {
            orientation: "portrait"
        }
    });

    let custom = form.watch();
    let theme = useMemo(() => { return themes.find((theme) => theme.id === custom.theme) }, [custom.theme, themes]);
    let size: Size | undefined = useMemo(() => { return sizes.find((size) => size.id === custom.sizeId) }, [custom.sizeId, sizes]);


    useEffect(() => {
        (async () => {
            let themesData = await getThemes({ map_type: mapType });
            setThemes(themesData);
            let sizesData = await getSizes();
            setSizes(sizesData)
            let versionsData = await getVersions()
            setVersions(versionsData);
            if (!custom.theme && themesData && themesData.length > 0) {
                setTimeout(() => {
                    form.setValue("theme", themesData[0].id);
                }, 500)
            }
            if (sizesData && sizesData.length > 0) {
                setTimeout(() => {
                    form.setValue("sizeId", sizesData[0].id);
                }, 500)
            }
        })();
        return () => {
            //cleanup
        }
    }, [])

    
    function addToCart(name: string) {
        let itemData: Partial<CartItem> = {
            name: name,
            price: 2000,
            productId: 231,
            properties: [],
            preview: theme!.preview,
            data: custom
        }

        if (theme && theme.name && itemData.properties) {
            itemData.properties.push({
                name: "Тема", 
                value:theme.name,
            })
        }
        if (size && size.name && itemData.properties) {
            itemData.properties.push({
                name: "Размер", 
                value:size.name,
            })
        }

        cart?.addItem(itemData);
        toast("Товар добавлен в корзину")
    }

    function getGeolocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            toast("Локация успешно получена")

            form.setValue("location", {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })

        }, (ss) => {
            console.log(ss)
            toast("Ошибка получения локации")
        })
    }

    return {
        sizes,
        size,
        versions,
        theme,
        themes,
        form,
        addToCart,
        getGeolocation,
        hasGeo
    }
}

export default useClient;