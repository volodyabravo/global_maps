/**
 * This file contains all of the logic for the client editor
 */
import { useEffect, useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getPrices, getSizes, getThemes, getVersions, MapTheme, MapType, Size, UserCustomizations, Version } from "../api/themes";
import { Cart, CartItem } from "../cart/cart.store";
import { GeocoderService, mapsLoaded } from "../components/geocoder/GoogleMaps";
import demo from "./../assets/demo-pic.png"

const hasGeo = 'geolocation' in navigator;

const useClient = (cart?: Cart, mapType?: MapType) => {

    const [themes, setThemes] = useState<Array<MapTheme>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [price, setPrice] = useState<number | null>(null);
    const [sizes, setSizes] = useState<Array<Size>>([]);
    const [versions, setVersions] = useState<Array<Version>>([]);


    // Form for storing data
    const form = useForm<UserCustomizations>({
        defaultValues: {
            orientation: "portrait",
        }
    });

    const custom = form.watch();

    const theme = useMemo(() => { return themes.find((theme) => theme.id === custom.theme) }, [custom.theme, themes]);
    const size: Size | undefined = useMemo(() => { return sizes.find((size) => size.id === custom.sizeId) }, [custom.sizeId, sizes]);


    useEffect(() => {
        (async () => {
            setLoading(true);
            const themesData = await getThemes({ map_type: mapType });
            setThemes(themesData);
            const sizesData = await getSizes();
            setSizes(sizesData)
            const versionsData = await getVersions()
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
            setLoading(false);
        })();
        return () => {
            //cleanup
        }
    }, [])




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

    function setLocationAutocomplete(autoCompleteResult: google.maps.places.AutocompletePrediction | null) {
        mapsLoaded()
        if (autoCompleteResult) {
            GeocoderService.current?.geocode({
                placeId: autoCompleteResult.place_id
            }, (res) => {
                if (res && res[0]) {
                    let place = res[0];
                    form.setValue("location", {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                        cityName: place.formatted_address
                    })
                }
            })
        }

    }


    async function getPrice() {
        if (custom.version && custom.version.length > 0 && custom.sizeId) {
            setLoading(true)
            let prices = await getPrices(
                custom.version[custom.version.length - 1].toString(),
                custom.sizeId.toString()
            )
            if (prices.length > 0) {
                setPrice(parseFloat(prices[0].price))
            }
            setLoading(false)
            console.log(prices)
        }

    }

    useEffect(() => {
        getPrice();
    }, [custom.sizeId, custom.version])

    function addToCart(name: string) {
        if (price == null || loading) return;
        let itemData: Partial<CartItem> = {
            name: name,
            price: price,
            properties: [],
            preview: theme!.preview || demo,
            data: custom,
            quantity: 1
        }

        if (theme && theme.name && itemData.properties) {
            itemData.properties.push({
                name: "Тема",
                value: theme.name,
            })
        }
        if (size && size.name && itemData.properties) {
            itemData.properties.push({
                name: "Размер",
                value: size.name,
            })
        }

        cart?.addItem(itemData);
        toast("Товар добавлен в корзину")
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
        setLocationAutocomplete,
        hasGeo,
        price,
        loading
    }
}

export default useClient;