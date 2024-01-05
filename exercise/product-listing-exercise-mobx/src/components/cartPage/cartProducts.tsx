import React from "react";
import {TCartProduct} from "../../types/allTypes";
import {observer} from "mobx-react-lite";
import {useRootStore} from "../../Context/RootContext";
import {Cart} from "../GenericCart/Cart";
import {NotFoundComponent} from "../NoSearchResultFound/NotFoundComponent";
import {CartStore} from "../../store/cartStore";
import {ListTableStore} from "../../store/ListTableStore";

export const CartProducts = observer(() => {
    const {cart} = useRootStore();
    const cartTotalProducts = cart.cartStore.data?.carts[0]?.products.filter((product: TCartProduct) => product.quantity > 0).length;

    if (!cart.cartStore.data?.carts[0]?.products.length || cartTotalProducts === 0) {
        return (
            <NotFoundComponent route={'home'}/>
        )
    }

    return (
        <>
            {cart.cartStore.data &&
                <Cart<ListTableStore<CartStore>>
                    data={cart.cartStore.data?.carts[0].products.filter((product: TCartProduct) => product.quantity > 0)} isCustom={false} store={cart.cartStore}/>
            }
        </>
    )
})