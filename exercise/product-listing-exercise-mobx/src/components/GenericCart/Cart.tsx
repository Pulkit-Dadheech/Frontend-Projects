import {observer} from "mobx-react-lite";
import {CartQuantityButton} from "../cartQuantityButton/cartQuantityButton";
import React from "react";

type TCart = {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedPrice?: number;
    thumbnail?: string;
    image?: string
}

export const Cart = observer(<T extends TCart, >({data}: { data: Array<T> }) => {
    const fetchDiscountPrice = (discount: number, price: number) => {
        return Math.round(price - (discount / 100) * price);
    }

    return (
        <>
            {data.map((cartProduct: T) => (
                <div key={cartProduct.id} className="product-information">
                    <div className={"product-image"}>
                        <img src={cartProduct.thumbnail || cartProduct.image} alt="Cart List" height="170"/>
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
                </div>))}
        </>
    )
})