import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

import { useLocation, useParams } from "react-router-dom";

import { getOrder } from "../api/themes";
import AppNavBar from "../components/AppBar";

export function OrderPage() {


    const { id } = useParams<{
        id: string
    }>();

    const { hash } = useLocation();

    const [order, setOrder] = useState<{
        amount: number
        email: string
        name: string
        order: number
        phone: string
        url?: string
    } | null>(null);


    useEffect(() => {
        (async () => {
            const order = await getOrder(id);
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