import styled from "@emotion/styled";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { createOrder, DeliveryMethodInfo, getCityDeliveryMethods, getCityPvz, getCityPvzParams, PVZ } from "../../api/themes";
import AutocompleteField from "./AutocompleteField";
import { TextField } from "./TextField";
import { Cart } from "../../cart/cart.store";
import PVZPicker from "./PVZPicker";
import { Checkbox, FormControlLabel, FormGroup, MenuItem, Select } from "@mui/material";
import { toast } from "react-toastify";

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

export default function OrderForm({ cartStore }: {
    cartStore?: Cart,

}) {
    let [stage, setStage] = useState(1);
    let [pvzs, setPvzs] = useState<PVZ[]>([]);
    let [methods, setMethods] = useState<DeliveryMethodInfo[]>([]);
    let [order, setOrder] = useState<{
        amount: number
        email: string
        name: string
        order: number
        phone: string
        url?: string
    } | null>(null);

    const [loading, setLoading] = useState(false);



    const [pvzPickerOpen, setPvzPickerOpen] = useState(false)


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
        pvz?: string
    }>({
        defaultValues: {
            type: "",
            city: undefined,
            street: "",
            entrance: "",
            floor: "",
            house: "",
            pvz: ""
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
            privacy: false
        }
    })

    let deliverySubmit = (data: any) => {
        setStage(2)


    }
    let paySubmit = (data: any) => {
        if (order?.url) {
            window.location.href = order.url;
        }
    }

    let deliveryValues = delivery.watch();

    useEffect(() => {
        (async () => {
            setLoading(true)
            if (deliveryValues.city && deliveryValues.city.id) {
                let pvzs = await getCityPvz({
                    delivery: {
                        delivery_city_id: deliveryValues.city.id
                    },
                    products: cartStore!.itemsForBackend
                })

                let deliveryMethods = await getCityDeliveryMethods({
                    delivery: {
                        delivery_city_id: deliveryValues.city.id
                    },
                    products: cartStore!.itemsForBackend
                })

                if (pvzs) {
                    setPvzs(pvzs)
                }
                if (deliveryMethods) {
                    setMethods(deliveryMethods)
                }
            }
            setLoading(false)
        })()
        return () => {
            // cleanup
        }
    }, [deliveryValues.city])

    let currentDeliveryMethod = useMemo(() => { return methods.find((item) => item.id === deliveryValues.type) }, [deliveryValues.type, methods])

    let currentPVZ = useMemo(() => { return pvzs.find((item) => item.id === deliveryValues.pvz) }, [deliveryValues.pvz, pvzs])

    let secondStageAvailable = false;
    if (currentDeliveryMethod) {
        if (currentDeliveryMethod.id == "manual_2181") {
            secondStageAvailable = true;
        }

        if (currentDeliveryMethod.type == "courier") {
            secondStageAvailable = true;
        }

        if (currentDeliveryMethod.type == "pvz") {
            if (currentPVZ) {
                secondStageAvailable = true;
            }
        }
    }

    const personalSubmit = async (dsdata: any) => {
        if (!deliveryValues.city) return;
        let personalVal = personalInfo.watch();
        let deliveryVal = delivery.watch();
        let data: getCityPvzParams = {
            delivery: {
                delivery_city_id: deliveryValues.city.id,
                delivery_city_name: deliveryValues.city.name,
                delivery_region: deliveryValues.city.region_name
            },
            products: cartStore!.itemsForBackend
        }

        if (currentDeliveryMethod) {
            data.delivery.delivery_type_id = currentDeliveryMethod.id;
            data.delivery.delivery_type_name = currentDeliveryMethod.name;
            if (currentDeliveryMethod.type === "pvz" && currentPVZ) {
                data.delivery.delivery_address = currentPVZ.address;
                data.delivery.pvz_id = currentPVZ.id
            } else if (currentDeliveryMethod.type === "courier") {
                data.delivery.delivery_street = deliveryVal.street;
                data.delivery.delivery_entrance = deliveryVal.entrance;
                data.delivery.delivery_floor = deliveryVal.floor;
                data.delivery.delivery_apartments = deliveryVal.house;

            }
        }

        if (personalVal) {
            data.personal = {
                call_back: personalVal.callme,
                comment: personalVal.comment,
                email: personalVal.email,
                emails_agree: personalVal.emailme,
                phone: personalVal.phone,
                name: personalVal.name,
            }
        }

        // Process order creation
        try {
            let response = await createOrder(data);
            if (response.url) {
                // Got url
                console.log(response.url);
                toast.info("Заказ создан")
                setOrder(response)
                setStage(3);
            } else {
                toast.info("Заказ создан но создание оплаты не получилось")
            }
        } catch (e) {

            toast.error("Ошибка создания заказа")
        }


    }

    return <div>
        <StageDisplay stage={stage} setStage={setStage}></StageDisplay>
        {/* Stage 1 delivery */}

        <div >
            {stage === 1 &&
                <form onSubmit={delivery.handleSubmit(deliverySubmit)}>
                    <AutocompleteField control={delivery.control} name="city" rules={{ required: true }} />

                    <Label>
                        Тип доставки
                    </Label>
                    <br></br>
                    <Controller
                        name="type"
                        rules={{ required: true }}
                        control={delivery.control}
                        render={({ field }) => <CustomSelect
                            {...field} sx={{ width: "100%" }} displayEmpty
                        >
                            <MenuItem disabled value="">
                                {methods.length > 0 && <em>Выберите тип доставки</em>}
                                {methods.length == 0 && !loading && <em>В этот город не доставляем</em>}
                                {methods.length == 0 && loading && <em>Загружается</em>}
                                
                                
                            </MenuItem>
                            {methods.map((method) => <MenuItem
                                key={method.id}
                                value={method.id}

                            >
                                {method.name}
                            </MenuItem>)
                            }
                        </CustomSelect>}
                    />
                    {currentDeliveryMethod && currentDeliveryMethod.type === "courier" && <>
                        <TextField rules={{ required: true, maxLength: 500 }} control={delivery.control} name="street" label="Улица" />
                        <TextField rules={{ required: true, maxLength: 500 }} control={delivery.control} name="entrance" label="Подъезд" />
                        <TextField rules={{ required: true, maxLength: 500 }} control={delivery.control} name="floor" label="Этаж" />
                        <TextField rules={{ required: true, maxLength: 500 }} control={delivery.control} name="house" label="Кв/Офис" />
                    </>}
                    {currentDeliveryMethod && currentDeliveryMethod.id === "manual_2181" && currentDeliveryMethod.type === "pvz" && <>
                        <br></br><label>
                            Адрес нашего офиса
                        </label>
                        <FakeControl>
                            ул. Свободы 61к1, офис 26Д, ПН-ПТН с 10 до 16
                        </FakeControl>
                    </>}
                    {currentDeliveryMethod && currentDeliveryMethod.id !== "manual_2181" && currentDeliveryMethod.type === "pvz" && <>
                        <br></br><Label>
                            Пункт самовывоза
                        </Label>
                        <br></br>
                        <Controller
                            name="pvz"
                            rules={{ required: true }}
                            control={delivery.control}
                            render={({ field }) => <CustomSelect
                                {...field} sx={{ width: "100%" }}
                            >
                                {pvzs.map((pvz) => <MenuItem
                                    key={pvz.id}
                                    value={pvz.id}
                                >
                                    {pvz.address}
                                </MenuItem>)}
                            </CustomSelect>}
                        />
                        <br></br>
                        <MapSelect onClick={() => { setPvzPickerOpen(true) }}>Выбрать на карте</MapSelect>
                    </>}

                    <DeliveryAndNext>
                        {currentDeliveryMethod && currentDeliveryMethod.delivery_price && <div>
                            <span>Доставка:</span>
                            <span>{currentDeliveryMethod.delivery_price} ₽</span>
                            <span>{currentDeliveryMethod.delivery_days} дней</span>
                        </div>}
                        <input type="submit" value="Следующий шаг" disabled={!secondStageAvailable || loading} />
                    </DeliveryAndNext>
                </form>
            }
            {stage === 2 &&
                <form onSubmit={personalInfo.handleSubmit(personalSubmit)}>
                    <TextField rules={{ required: true, maxLength: 500 }} control={personalInfo.control} name="name" label="*Имя получателя" />
                    <TextField rules={{ required: true, maxLength: 500 }} control={personalInfo.control} name="surname" label="*Фамилия получателя" />
                    <TextField rules={{ required: true }} control={personalInfo.control} name="phone" label="*Телефон получателя" />
                    <TextField rules={{ required: true, maxLength: 500 }} control={personalInfo.control} name="email" label="*Ваш E-Mail" />
                    <TextField rules={{ maxLength: 5000 }} control={personalInfo.control} name="comment" label="Комментарии к заказу" />


                    {cartStore?.totalPrice && currentDeliveryMethod && <div>
                        Итого сумма заказа с учетом доставки {cartStore.totalPrice + currentDeliveryMethod.delivery_price}
                    </div>}



                    <Controller
                        name="callme"
                        rules={{ required: true }}
                        control={personalInfo.control}
                        render={({ field }) =>
                            <CustomFormControlLabel control={<CustomCheckbox {...field} />} label="Хочу, чтобы менеджер мне перезвонил" />}
                    />

                    <Controller
                        name="emailme"
                        rules={{ required: true }}
                        control={personalInfo.control}
                        render={({ field }) =>
                            <CustomFormControlLabel control={<CustomCheckbox {...field} />} label="Хочу получать новости" />}
                    />

                    <Controller
                        name="privacy"
                        rules={{ required: true }}
                        control={personalInfo.control}
                        render={({ field }) =>
                            <CustomFormControlLabel control={<CustomCheckbox {...field} />} label="Соглашаюсь с политикой с конфиденциальности" />}
                    />


                    <PrevNextButtons>
                        <button onClick={() => { setStage(1) }} >Назад</button>
                        <input type="submit" value="Оформить заказ" />
                    </PrevNextButtons>

                </form>
            }
            {stage === 3 &&
                <form onSubmit={delivery.handleSubmit(paySubmit)}>
                    <div>
                        Стоимость заказа {order?.amount}Р
                    </div>

                    <PrevNextButtons>
                        <button onClick={() => { setStage(2) }}>Назад</button> <input type="submit" value="Оплатить" />
                    </PrevNextButtons>

                </form>
            }
        </div>
        {pvzs.length > 0 && <PVZPicker pvzs={pvzs} isOpen={pvzPickerOpen} setOpen={setPvzPickerOpen} onSelect={(val) => delivery.setValue("pvz", val || "")} />}
    </div >
}

const MapSelect = styled.span`
    color: #4981e9;
    cursor: pointer;
`

const FakeControl = styled.div`
    background: #F8F8F8;
    border: 1px solid #E8E7E7;
    box-sizing: border-box;
    border-radius: 3px;
    padding: 1em;
`

const PrevNextButtons = styled.div`
    margin-top: 2em;
    display: flex;

    button, input {
        flex-basis: 49%;
            cursor: pointer;
            flex-grow: 1;
            padding: 10px;
            background: #3F557F;
            border: 1px solid #3F557F;
            box-sizing: border-box;
            border-radius: 5px;
            font-family: Montserrat;
            font-style: normal;
            font-weight: normal;
            font-size: 9px;
            line-height: 15px;
            /* identical to box height, or 167% */

            text-align: center;
            text-transform: uppercase;

            color: #FFFFFF;
            &:hover {
                background: #4a6392;
            }
            
    }
    button {
        background: #FFFFFF;
        color: black;
        border: 1px solid #202945;
        border-radius: 5px;
        &:hover {
            background: #e9e9e9;
        }
    }

    input {
        font-weight: bold;
    }
`

const  CustomFormControlLabel =  styled(FormControlLabel)(`
    .MuiFormControlLabel-label{
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-family: Montserrat;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        line-height: 20px;
    }
`)

const CustomCheckbox  = styled(Checkbox)(`

    .MuiTypography-body1 {
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-family: Montserrat;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        line-height: 20px;
    }
`)

const CustomSelect = styled(Select)(`
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 20px;
    background: #FFFFFF;
    border: 1px solid #E8E7E7;
    box-sizing: border-box;
    border-radius: 3px;
    box-shadow: none;
    padding: 5px;
    .MuiSelect-select {
        padding: 6px 6px;
    }
`);

const Label = styled('label')(`
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 20px;

`);
const DeliveryAndNext = styled.div`
    display: flex;
    width: 100%;
    padding: 5px;
    align-items: end;
    & > div {
        display: flex;
        flex-direction: column;
        font-family: Montserrat;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 20px;
        /* identical to box height, or 125% */
    }
    & > input {
        margin-left: 2em;
        cursor: pointer;
        flex-grow: 1;
        padding: 10px;
        background: #3F557F;
        border: 1px solid #3F557F;
        box-sizing: border-box;
        border-radius: 5px;
        font-family: Montserrat;
        font-style: normal;
        font-weight: normal;
        font-size: 9px;
        line-height: 15px;
        /* identical to box height, or 167% */

        text-align: center;
        text-transform: uppercase;

        color: #FFFFFF;
        &:hover {
            background: #4a6392;
        }

        &:disabled {
            color: #4b4b4b;
            background: #dadada;
            border: 1px solid #c1c3c7;
        }
    }
`

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
    margin-bottom: 25px;
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
