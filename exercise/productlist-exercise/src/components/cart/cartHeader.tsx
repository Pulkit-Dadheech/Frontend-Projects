import React from "react";
import {useGetUserCart, useGetUserDetails, UserCart} from "../../customHooks";

export default function CartHeader(){
    const userDetails=useGetUserDetails();
    const userName=`${userDetails?.firstName} ${userDetails?.lastName}`;

    const userCartCatalog = useGetUserCart();
    const length=userCartCatalog?.carts[0].products.length;

    return (
        <div className="cartHeaderName">
            <h1>{userName}</h1>
            <h2>{length}</h2>
        </div>
    )
}