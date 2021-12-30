import styled from "@emotion/styled";
import { FaChevronRight, FaTimes } from "react-icons/fa";
import { Item } from "../../pages/Cart";

interface CartItemProps {
    item: Item;
    onDelete?: (item: Item) => void;
    onLearnMore?: (item: Item) => void;
}
export function CartItem(props: CartItemProps) {
    return <CartItemDiv>
        <CartPicture>
            {props.item.preview && <img src={props.item.preview} alt="Превью карты" />}
        </CartPicture>
        <ItemName>
            <div>{props.item.name}</div>
            <div>
                {props.item && props.item.properties && props.item.properties.map((item) => <div>
                    <ItemParameterName>{item.name}: </ItemParameterName>{item.value}
                </div>)}
            </div>

        </ItemName>
        <ItemDetails onClick={() => props.onLearnMore && props.onLearnMore(props.item)} >
            {/* Подробнее <FaChevronRight /> */}
        </ItemDetails>
        <ItemPrice>
            {props.item.price} ₽
        </ItemPrice>
        <ItemActionButton>
            <FaTimes onClick={() => props.onDelete && props.onDelete(props.item)} />
        </ItemActionButton>
    </CartItemDiv>
}


const CartItemDiv = styled.div`
    display: flex;
    border-bottom: solid 1px #C3C9CF;
    font-weight: normal;
    padding: 12px;
    & > div {

    }
`

const CartPicture = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 120px;
    & img { 
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`
const ItemName = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 2em;
    padding: 12px;
    align-items: top;
    font-weight: 400;
    font-size: 0.95em;

    & span {
        color: #7b8797;
    }
`

const ItemParameterName = styled.span`


`

const ItemDetails = styled.div`
    display: flex;
    padding: 12px;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    font-weight: 300;
    line-height: 1em;
    cursor: pointer;
    padding-left: 4px;
   

    & svg {
        transition: all 0.2s;
        transform: translate(2px, 2px);
    }
    &:hover svg {
        transform: translate(5px, 2px);
    }
`

const ItemPrice = styled.div`
    display: flex;
    padding: 12px;
    align-items: center;
    font-style: normal;
    font-weight: 600;
`


const ItemActionButton = styled.div`
    display: flex;
    padding: 12px;
    align-items: center;
    justify-content: center;
    cursor: pointer;

`