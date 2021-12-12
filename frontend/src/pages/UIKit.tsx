import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckoutButton } from "../components/buttons/CheckOutButton";
import PVZPicker from "../components/form/PVZPicker";
import { TextField } from "../components/form/TextField";
import { LocationSelector } from "../components/geocoder/LocationSelector";
import { pvzs } from "./UIVars";

export function UIKitPage() {
    const [popupOpen, setPopupOpen] = useState(true)
    const demoForm = useForm({
        defaultValues: {
            demo1: "",
            demo2: ""
        },
        
    })


    const onSubmit = (data:any) => console.log(data);

    let ass = demoForm.watch();
    console.log(ass);
    return <div>
        <CheckoutButton onClick={() => { alert("clicked") }} />
        <LocationSelector />
        <form onSubmit={demoForm.handleSubmit(onSubmit)}>
            <TextField rules={{required: true, maxLength:8, minLength: 4}} control={demoForm.control} label="Штука" name="demo1" placeholder="demo1" />
            <TextField rules={{required: true, maxLength:8, minLength: 4}} control={demoForm.control} label="Штука" name="demo2" placeholder="demo2" />
            <input type="submit" />
            {/* <PVZPicker pvzs={pvzs} isOpen={popupOpen} setOpen={setPopupOpen}/> */}
        </form>
        

    </div>
}