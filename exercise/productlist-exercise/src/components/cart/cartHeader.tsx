import React from "react";
import {useGetUserDetails} from "../customHooks/UserDetails";
import {UserCart} from "../../dataTypes";
import './cartHeader.css'
import {Link} from "react-router-dom";

export default function CartHeader({userCartCatalog}: { userCartCatalog: UserCart | null; }) {

    const {userDetails,userDataError} = useGetUserDetails();
    const userName = `${userDetails?.firstName} ${userDetails?.lastName}`;
    if(!userCartCatalog){
        return(<h1>Loading...</h1>)
    }
    const filteredUserCart=userCartCatalog.carts[0].products.filter((product)=>product.quantity!==0)

    const totalProductsInUserCart = filteredUserCart?.length;

    if(userDataError){
        return (<h1>Failed to get User Details</h1>)
    }
    if(!userDetails){
        return(<div>Fetching User Details....</div>)
    }
    return (
        <div className="cart-header">
            <div className="homepage">
                <Link to="/">HomePage</Link>
            </div>
            <h1 className="cart-header-name">{userName}</h1>
            <h2 className="cart-total-products">
                Your Products({totalProductsInUserCart})
            </h2>

        </div>
    )
}