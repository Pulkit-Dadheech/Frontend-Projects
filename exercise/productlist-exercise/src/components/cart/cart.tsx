import React, {useContext} from "react";
import CartHeader from "./cartHeader";
import CartProductsList from "./cartProductsList";
import {UserContext} from "../../context";


export default function Cart() {

    const userContext = useContext(UserContext);

    if (!userContext) {
        throw new Error("UserContext is not provided correctly.");
    }

    const {userCart, setUserCart, loading} = userContext;
    if (!userCart) {
        return (<h1>Loading...</h1>)
    }

    return (
        <>
            <CartHeader userCartCatalog={userCart}/>
            <CartProductsList userCartCatalog={userCart} setUserCartCatalog={setUserCart} loading={loading}/>
        </>
    )
}