import styled from "@emotion/styled";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getCityPvz, PVZ } from "../../api/themes";
import AutocompleteField from "./AutocompleteField";
import { TextField } from "./TextField";
import { Cart } from "../../cart/cart.store";
import PVZPicker from "./PVZPicker";
const stages = [
    {
        name: "Выберите способ доставки",
    },
    {
        name: "Ваши данные",
    },
    {
        name: "Оплатите заказ",
    }
]

export default function OrderForm({cartStore}: {cartStore?: Cart}) {
    let [stage, setStage] = useState(3);
    let [pvzs, setPvzs] = useState<{
        [key: string]: PVZ
    }>({});


    let delivery = useForm<{
        type: string,
        city?: {
            name: string,
            id: string,
            postalcode: string,
            region_name: string,
            short_name: string
        },
        street: string,
        entrance: string,
        floor: string,
        house: string,
        pvz: null
    }>({
        defaultValues: {
            type: "",
            city: undefined,
            street: "",
            entrance: "",
            floor: "",
            house: "",
            pvz: null
        }
    })

    let personalInfo = useForm({
        defaultValues: {
            name: "",
            surname: "",
            phone: "",
            email: "",
            comment: "",
            callme: false,
            emailme: false,
        }
    })

    let deliverySubmit = (data: any) => {
        setStage(2);

    }

    const personalSubmit = (data: any) => {
        setStage(3)
    }

    let city = delivery.watch("city");

    useEffect(() => {
        (async ()=>{
            console.log(city)
            if (city && city.id) {
                let pvzs = await  getCityPvz({
                    delivery:{
                        delivery_city_id: city.id
                    },
                    products: cartStore!.itemsForBackend
                })
               
                if (pvzs ) {
                    console.log(Object.keys(pvzs).length)
                    setPvzs(pvzs)
                }
            }
        })()
        return () => {
            // cleanup
        }
    }, [city])

    return <div>
        <StageDisplay stage={stage} setStage={setStage}></StageDisplay>
        {/* Stage 1 delivery */}
        <div >
            {stage === 1 &&
                <form onSubmit={delivery.handleSubmit(deliverySubmit)}>
                    <AutocompleteField control={delivery.control} name="city" rules={{ required: true }} />
                    <TextField rules={{ required: true, maxLength: 500 }} control={delivery.control} name="type" label="Тип доставки" />
                    <TextField rules={{ required: true, maxLength: 500 }} control={delivery.control} name="street" label="Улица" />
                    <input type="submit" value="Следующий шаг" />
                </form>
            }
            {stage === 2 &&
                <form onSubmit={personalInfo.handleSubmit(personalSubmit)}>
                    <TextField rules={{ required: true, maxLength: 500 }} control={personalInfo.control} name="name" label="*Имя получателя" />
                    <TextField rules={{ required: true, maxLength: 500 }} control={personalInfo.control} name="surname" label="*Фамилия получателя" />
                    <TextField rules={{ required: true, maxLength: 500 }} control={personalInfo.control} name="phone" label="*Телефон получателя" />
                    <TextField rules={{ required: true, maxLength: 500 }} control={personalInfo.control} name="email" label="*Ваш E-Mail" />
                    <TextField rules={{ maxLength: 5000 }} control={personalInfo.control} name="comment" label="Комментарии к заказу" />
                    <button onClick={() => { setStage(1) }} >Prev</button> <input type="submit" value="Следующий шаг" />
                </form>
            }
            {stage === 3 &&
                <form onSubmit={delivery.handleSubmit(deliverySubmit)}>
                    Стоимость заказа
                    <button onClick={() => { setStage(2) }}>Prev</button> <input type="submit" value="Следующий шаг" />
                </form>
            }
        </div>
        {Object.keys(pvzs).length > 0 && <PVZPicker pvzs={pvzs}/>}
    </div>
}



function StageDisplay(props: { stage: number, setStage: (stage: number) => void }) {
    let numbers = [];

    for (let i = 1; i <= props.stage; i++) {
        numbers.push(
            <div className={classNames("numberContainer", {
                "active": i === props.stage
            })} onClick={() => { props.setStage(i) }}><span>{i}</span></div>
        )
    }

    return (<StageDisplayDiv>
        {numbers}

        <h5>{stages[props.stage - 1].name}</h5>
    </StageDisplayDiv>);
}

const StageDisplayDiv = styled.div`
    display: flex;
    align-items: center;
    margin-top: 1.5em;
    & .numberContainer {
        height: 2em;
        width: 2em;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin: 0 5px 0 0;
        background: #A43F63;
        box-sizing: content-box;
        color: white;
        border: none;
        &.active {
            background: none;
            color: black;
            border: solid red 1px ;
        }
    }
    h5 {
        font-family: Montserrat;
        font-style: normal;
        font-weight: 600;
        font-size: 15px;
        line-height: 20px;
        /* identical to box height, or 133% */
        letter-spacing: 0.225px;
        text-transform: uppercase;
        margin: 0;
        margin-left: 1em;
    }
    
`

function NextStepButton() {
    return (
        <div></div>
    );
}
