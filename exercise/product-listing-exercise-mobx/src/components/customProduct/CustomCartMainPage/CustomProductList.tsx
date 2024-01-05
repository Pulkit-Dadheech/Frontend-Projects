import React from "react";
import {TSingleCustomProduct} from "../../../types/allTypes";
import {observer} from "mobx-react-lite";
import {CartQuantityButton} from "../../cartQuantityButton/cartQuantityButton";
import {useRootStore} from "../../../Context/RootContext";
import {useRouterStore} from "mobx-state-router";

export const CustomProductList = observer(() => {
    const router = useRouterStore();
    const {customProduct} = useRootStore();
    const store = customProduct.customProductStore;
    const fetchDiscountPrice = (discount: number, price: number) => {
        return Math.round(price - (discount / 100) * price);
    }

    if (!store.data) {
        return (
            <div className={"cart-no-product-found"}>
                <h1>No Product Found</h1>
                <button onClick={() => router.goTo('home')}>Add New Products</button>
            </div>)
    }

    return (
        <>
            {store.data &&
                store.data.map((cartProduct: TSingleCustomProduct) => (
                    <div key={cartProduct.id} className="product-information">
                        <div className={"product-image"}>
                            <img src={cartProduct.images[0]} alt="Cart List" height="170"/>
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
                        </div>
                        <div className={"product-rating"}>
                            <CartQuantityButton quantity={cartProduct.quantity} id={cartProduct.id}
                                                stock={cartProduct.total}/>
                        </div>
                    </div>
                ))
            }
        </>
    )
})