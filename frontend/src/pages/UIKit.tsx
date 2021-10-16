import { CheckoutButton } from "../components/buttons/CheckOutButton";

export function UIKitPage () {
    return <div>
        <CheckoutButton onClick={()=>{alert("clicked")}}/>
    </div>
}