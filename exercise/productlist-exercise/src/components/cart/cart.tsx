import React from "react";
import {useGetUserCart, useGetUserDetails} from "../../customHooks";
import CartHeader from "./cartHeader";
import CartProductsList from "./cartProductsList";


export default function Cart() {

    return (
        <>
            <CartHeader/>
            <CartProductsList/>
        </>
    )
}