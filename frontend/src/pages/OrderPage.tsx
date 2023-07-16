import { Grid } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";

import { getOrder, getThemes, MapTheme, UserCustomizations } from "../api/themes";
import { MapView } from "../components/MapView";
import AppNavBar from "../components/AppBar";

export function OrderPage() {


    const { id } = useParams<{
        id: string
    }>();

    const { hash } = useLocation();

    let [order, setOrder] = useState<{
        amount: number
        email: string
        name: string
        order: number
        phone: string
        url?: string
    } | null>(null);


    useEffect(() => {
        (async () => {
            let order = await getOrder(id);
            setOrder(order)
        })()
        return () => {
            //cleanup
        }
    }, [])

    return <div>
        <AppNavBar />
        {order && <div style={{
            textAlign:"center",
            padding: "3em"
        }}>
            {hash === "#success" && <div>
                <h1>Заказ успешно принят, ожидайте звонка менеджера</h1>
            </div>}
            {hash === "#fail" && <div>
                <h1>Заказ оплатить не удалось, свяжитесь с менеджером</h1>
            </div>}


        </div>}
    </div >
}