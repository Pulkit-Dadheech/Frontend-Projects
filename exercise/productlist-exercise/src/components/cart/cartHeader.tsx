import React from "react";
import {useGetUserDetails, UserCart} from "../../customHooks";
import './cartHeader.css'

export default function CartHeader({userCartCatalog}: { userCartCatalog: UserCart | undefined; }) {


    const userDetails = useGetUserDetails();
    const userName = `${userDetails?.firstName} ${userDetails?.lastName}`;

    const totalProductsInUserCart = userCartCatalog?.carts[0]?.products.length;

    return (
        <div className="cart-header">
            <h1 className="cart-header-name">{userName}</h1>
            <h2 className="cart-total-products">
                Your Products({totalProductsInUserCart})
            </h2>
        </div>
    )
}