import {useRouterStore} from "mobx-state-router";
import "./cartHeader.css"
import {observer} from "mobx-react-lite";
import {TCartProduct} from "../../types/allTypes";
import {useRootStore} from "../../Context/RootContext";


export const CartHeader = observer(() => {

    const routerStore = useRouterStore();
    const {cart}=useRootStore();

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
                Products({cart.cartStore.data?.carts[0]?.products.filter((product: TCartProduct) => product.quantity > 0).length || 0})
            </h2>

        </div>
    )
})