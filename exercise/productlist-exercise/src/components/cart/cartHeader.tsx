import React, {useContext} from "react";
import {TUserCart} from "../../dataTypes";
import './cartHeader.css'
import {Link} from "react-router-dom";
import {UserContext} from "../../context";
import {CustomProductContext} from "../../CustomProductContext";

export default function CartHeader({userCartCatalog}: { userCartCatalog: TUserCart | null; }) {
    const userContext = useContext(UserContext);
    const customProductContext = useContext(CustomProductContext);


    if (!userContext) {
        throw new Error("UserContext is not provided correctly.");
    }
    if(!customProductContext){
        throw new Error("CustomProductContext is not provided correctly.");
    }

    const {customProducts}=customProductContext;


    const {selectedUserDetails} = userContext;
    if (!userCartCatalog) {
        return (<h1>Loading...</h1>)
    }

    const cart = userCartCatalog.carts[0];
    const products = cart ? cart.products : [];
    const filteredUserCart = products.filter((product) => product.quantity !== 0)
    const filterCustomProduct=customProducts.filter((product)=>product.quantity!==0)
    const totalProductsInUserCart = filteredUserCart?.length + filterCustomProduct?.length;


    return (
        <div className="cart-header">
            <div className="homepage">
                <Link to="/">HomePage</Link>
            </div>
            <h1 className="cart-header-name">{selectedUserDetails.name}</h1>
            <h2 className="cart-total-products">
                Your Products({totalProductsInUserCart})
            </h2>

        </div>
    )
}