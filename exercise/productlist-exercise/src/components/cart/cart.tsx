import React, {useContext} from "react";
import CartHeader from "./cartHeader";
import CartProductsList from "./cartProductsList";
import {UserContext} from "../../context";


export default function Cart() {

    const userContext = useContext(UserContext);

    // Check if userContext is defined
    if (userContext === undefined) {
        throw new Error("UserContext is not provided correctly.");
    }

    const {userCart, setUserCart} = userContext;

    if(!userCart){
        return <></>;
    }
    return (
        <>
            <CartHeader userCartCatalog={userCart}/>
            <CartProductsList userCartCatalog={userCart} setUserCartCatalog={setUserCart}/>
        </>
    )
}