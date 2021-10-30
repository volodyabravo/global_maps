import { CheckoutButton } from "../components/buttons/CheckOutButton";
import { LocationSelector } from "../components/geocoder/LocationSelector";

export function UIKitPage () {
    return <div>
        <CheckoutButton onClick={()=>{alert("clicked")}}/>
        <LocationSelector/>
    </div>
}