import {observer} from "mobx-react-lite";
import {CartHeader} from "./cartHeader";
import {CartProducts} from "./cartProducts";
import {CartStore} from "../../store/cartStore";

export const CartPage = observer(() => {
    return (
        <>
            <CartHeader/>
            <CartProducts/>
        </>
    );
});
