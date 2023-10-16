import React, {useContext} from "react";
import CartHeader from "./cartHeader";
import CartProductsList from "./cartProductsList";
import {UserContext} from "../../context";


export default function Cart() {

    const userContext = useContext(UserContext);

    if (userContext === undefined) {
        throw new Error("UserContext is not provided correctly.");
    }

    const {userCart, setUserCart} = userContext;
    return (
        <>
            <CartHeader userCartCatalog={userCart}/>
            <CartProductsList userCartCatalog={userCart} setUserCartCatalog={setUserCart}/>
        </>
    )
}