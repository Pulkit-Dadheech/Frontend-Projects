import "./cartHeader.css"
import {observer} from "mobx-react-lite";
import {TCartProduct} from "../../types/allTypes";
import {CartStore} from "../../store/cartStore";
import {useRouterStore} from "mobx-state-router";

const cart = new CartStore();
export const CartHeader = observer(() => {
    const routerStore=useRouterStore();

    const handleNavigation = () => {
        routerStore.goTo('home');
    }

    return (
        <div className="cart-header">
            <div className="homepage">
                <button onClick={handleNavigation}>HomePage</button>
            </div>
            <h1 className="cart-header-name">{"name"}</h1>
            <h2 className="cart-total-products">
                Your
                Products({cart.cartStore.data?.carts[0]?.products.filter((product: TCartProduct) => product.quantity > 0).length})
            </h2>

        </div>
    )
})