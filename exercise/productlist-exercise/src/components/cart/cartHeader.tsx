import React, {useContext} from "react";
import {UserCart} from "../../dataTypes";
import './cartHeader.css'
import {Link} from "react-router-dom";
import {UserContext} from "../../context";

export default function CartHeader({userCartCatalog}: { userCartCatalog: UserCart | null; }) {
    const userContext = useContext(UserContext);

    if (!userContext) {
        throw new Error("UserContext is not provided correctly.");
    }


    const {selectedUser} = userContext;
    if (!userCartCatalog) {
        return (<h1>Loading...</h1>)
    }

    const cart = userCartCatalog.carts[0];
    const products = cart ? cart.products : [];
    const filteredUserCart = products.filter((product) => product.quantity !== 0)
    const totalProductsInUserCart = filteredUserCart?.length;


    return (
        <div className="cart-header">
            <div className="homepage">
                <Link to="/">HomePage</Link>
            </div>
            <h1 className="cart-header-name">{selectedUser}</h1>
            <h2 className="cart-total-products">
                Your Products({totalProductsInUserCart})
            </h2>

        </div>
    )
}