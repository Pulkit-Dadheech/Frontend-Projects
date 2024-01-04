import React from "react";
import {TCartProduct} from "../../types/allTypes";
import {observer} from "mobx-react-lite";
import {useRouterStore} from "mobx-state-router";
import {CartStore} from "../../store/cartStore";

const cart = new CartStore();
export const CartProducts = observer(() => {
    const router = useRouterStore();


    const fetchDiscountPrice = (discount: number, price: number) => {
        return Math.round(price - (discount / 100) * price);
    }

    if (!cart.cartStore.data?.carts[0]?.products.length) {
        return (
            <div className={"cart-no-product-found"}>
                <h1>No Product Found</h1>
                <button onClick={() => router.goTo('home')}>Add New Products</button>
            </div>)
    }
    return (
        <>
            {cart.cartStore.data &&
                cart.cartStore.data?.carts[0].products.filter((product: TCartProduct) => product.quantity > 0).map((cartProduct: TCartProduct) => (
                    <div key={cartProduct.id} className="product-information">
                        <div className={"product-image"}>
                            <img src={cartProduct.thumbnail} alt="Cart List" height="170"/>
                        </div>
                        <div className={"product-description"}>
                            <h3>Name: {cartProduct.title}</h3>
                            <h4>
                                Price: <>
                                {fetchDiscountPrice(cartProduct.discountPercentage, cartProduct.price)}
                                <span>&#36;</span>
                                (
                                <del>{cartProduct.price}</del>
                                <span>&#36;</span>
                                )
                            </>
                            </h4>
                            {/*<h4>Category: {cartProduct.category}</h4>*/}
                            {/*<p>Description: {cartProduct.description}</p>*/}
                        </div>
                        <div className={"product-rating"}>
                            {/*<p>Rating: {cartProduct.rating}</p>*/}
                        </div>
                    </div>
                ))
            }
        </>
    )
})