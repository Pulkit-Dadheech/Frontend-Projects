import React from "react";
import {useGetUserDetails} from "../../customHooks";
import {UserCart} from "../../dataTypes";
import './cartHeader.css'

export default function CartHeader({userCartCatalog}: { userCartCatalog: UserCart; }) {


    const userDetails = useGetUserDetails();
    const userName = `${userDetails.firstName} ${userDetails.lastName}`;

    const filteredUserCart=userCartCatalog.carts[0].products.filter((product)=>product.quantity!==0)

    const totalProductsInUserCart = filteredUserCart.length;

    return (
        <div className="cart-header">
            <h1 className="cart-header-name">{userName}</h1>
            <h2 className="cart-total-products">
                Your Products({totalProductsInUserCart})
            </h2>
        </div>
    )
}