import { useForm } from "react-hook-form";
import { CheckoutButton } from "../components/buttons/CheckOutButton";
import { TextField } from "../components/form/TextField";
import { LocationSelector } from "../components/geocoder/LocationSelector";
import AppNavBar from "../components/AppBar";

export function UIKitPage() {
    const demoForm = useForm({
        defaultValues: {
            demo1: "",
            demo2: ""
        },
        
    })


    const onSubmit = (data:any) => console.log(data);

    return <div>
        <AppNavBar />
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