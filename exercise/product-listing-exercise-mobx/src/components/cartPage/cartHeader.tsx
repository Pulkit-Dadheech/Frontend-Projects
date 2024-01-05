import {useRouterStore} from "mobx-state-router";
import "./cartHeader.css"
import {observer} from "mobx-react-lite";
import {TCartProduct} from "../../types/allTypes";
import {useRootStore} from "../../Context/RootContext";
import {useEffect} from "react";


export const CartHeader = observer(() => {

    const routerStore = useRouterStore();
    const {cart, users} = useRootStore();

    useEffect(() => {
        const getUserData = async () => {
            await users.userStore.fetchData();
        }
        if (!users.userStore.data)
            getUserData();
    }, []);

    const handleNavigation = () => {
        routerStore.goTo('home');
    }

    const userInfo = users.userStore.data?.users.find((user) => user.id === cart.cartStore.userId);
    return (
        <div className="cart-header">
            <div className="homepage">
                <button onClick={handleNavigation}>HomePage</button>
            </div>
            <h1 className="cart-header-name">{`${userInfo ? userInfo.firstName : ""} ${userInfo ? userInfo.lastName : ""}`}</h1>
            <h2 className="cart-total-products">
                Your
                Products({cart.cartStore.data?.carts[0]?.products.filter((product: TCartProduct) => product.quantity > 0).length || 0})
            </h2>

        </div>
    )
})