import { useForm } from "react-hook-form";
import { CheckoutButton } from "../components/buttons/CheckOutButton";
import { TextField } from "../components/form/TextField";
import { LocationSelector } from "../components/geocoder/LocationSelector";

export function UIKitPage() {
    const demoForm = useForm({
        defaultValues: {
            demo1: ""
        }
    })


    let ass = demoForm.watch();
    console.log(ass);
    return <div>
        <CheckoutButton onClick={() => { alert("clicked") }} />
        <LocationSelector />
        <TextField control={demoForm.control} name="demo1" placeholder="demo1" />
    </div>
}