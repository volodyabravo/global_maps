import { Container, Grid, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { getThemes, MapTheme, UserCustomizations } from "../api/themes";
import { MapView } from "../components/MapView";
import styled from "@emotion/styled";
import { FaCross, FaTimes } from "react-icons/fa";

import demo from "./../assets/demo-pic.png"
import { CartItem } from "../components/cart/CartItem";
import { inject, observer } from "mobx-react";
import cartStore, { Cart } from "../cart/cart.store";

export interface Item {
    preview?: string;
    name?: string;
    price?: number;
}

function CartPage(props: {
    cartStore?: Cart
}) {
    const items = cartStore.itemsArray;
    return <div>
        <SectionTitle>Оформление заказа</SectionTitle>
        <Container>
            <PartsContainer>
                <CartItemsContainer>
                    <h2>
                        товары в заказе
                    </h2>
                    <CartItemsWrapper>
                        {items.length > 0 ?
                            items.map((item, index) => <CartItem item={item} onDelete={() => cartStore.removeItem(index)} />)
                            :
                            <div>Нет товаров в корзине</div>
                        }
                    </CartItemsWrapper>
                </CartItemsContainer>
                <CartFormContainer>
                    <h2>
                        Оформление заказа
                    </h2>
                </CartFormContainer>
            </PartsContainer>
        </Container>

        <RecommendedTitle>рекомендуем</RecommendedTitle>
    </div >
}

const SectionTitle = styled.h1`
    font-size: 2em;
    text-align: center;
    font-weight: 600;
    text-transform: uppercase;
    padding: 1em;
    color: #202945;
`

const RecommendedTitle = styled.h1`
    font-size: 2em;
    text-align: center;
    font-weight: 600;
    text-transform: uppercase;
    padding: 1em;
    color: #202945;
`

const PartsContainer = styled.div`
    display: flex;
    ${props => props.theme.breakpoints.down("md")} {
        flex-direction: column;
    }
    justify-items: center;
`

const CartItemsContainer = styled.div`
    /* display: flex; */
    flex-basis: 70%;
    background: #F8F8F8;
    margin: 6px;
    padding: 13px;
    ${props => props.theme.breakpoints.down("md")} {
        
    }
    & > h2 {
        font-size: 1.5em;
        text-align: left;
        font-weight: 600;
        margin:0;
        text-transform: uppercase;
        color: #202945;
    }
`
const CartItemsWrapper = styled.div`
    padding: 13px 20px;

`

const CartFormContainer = styled.div`
    display: flex;
    margin: 6px;
    padding: 13px;
    flex-basis: 30%;
    background: #F8F8F8;
    ${props => props.theme.breakpoints.down("md")} {
        
    }
    & > h2 {
        font-size: 1.5em;
        text-align: center;
        font-weight: 600;
        text-transform: uppercase;
        color: #202945;
        margin:0;
        width: 100%;
    }
`

export default inject('cartStore')((observer(CartPage)))