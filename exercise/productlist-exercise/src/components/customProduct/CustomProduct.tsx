import React, {useContext} from 'react';
import {UserContext} from "../../context";
import ProductList from "../ProductList/ProductsList";
import {CustomProductHeader} from "./CustomProductHeader";
import {CustomProductContext} from "../../CustomProductContext";

const CustomProduct = () => {
    const userContext = useContext(UserContext);
    const customProductContext = useContext(CustomProductContext);

    if (!userContext) {
        throw new Error("UserContext is not provided correctly.");
    }
    if (!customProductContext) {
        throw new Error("UserContext is not provided correctly.");
    }

    const {customProducts} = customProductContext;
    const {userCart, setUserCart} = userContext;

    if (!userCart) {
        return (<h1>No Items in Cart</h1>)
    }


    return (
        <>
            <CustomProductHeader/>
            <ProductList
                productListWithQuantity={customProducts}
                userCartCatalog={userCart}
                setUserCartCatalog={setUserCart}
                loading={false}
            />
        </>
    );
};

export default CustomProduct;
