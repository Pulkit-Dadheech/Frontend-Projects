import React, {Dispatch, SetStateAction} from "react";
import {useProductList} from "../../customHooks";
import {listWithQuantity, UserCart} from "../../dataTypes";
import "./ProductComponent.css";
import ProductList from "../ProductList/ProductsList";

export default function Product(props: {
    searchBoxResult?: string;
    category?: string,
    userCartCatalog: UserCart,
    setUserCartCatalog: Dispatch<SetStateAction<UserCart | null>>;
},) {

    const {productCatalog, productError, loading} = useProductList(props.searchBoxResult, props.category);
    const {userCartCatalog} = props;

    if (loading) {
        return (<h1>fetching user name...</h1>)
    }
    if (productError) {
        return (<h1>Error Fetching Product Catalog</h1>);
    }


    const productListWithQuantity: listWithQuantity = productCatalog?.products.map((product) => {
        return {
            ...product,
            quantity: userCartCatalog.carts[0].products.find((p) => p.id === product.id)?.quantity || 0
        }
    })
    return (
        <ProductList
            productListWithQuantity={productListWithQuantity}
            userCartCatalog={props.userCartCatalog}
            setUserCartCatalog={props.setUserCartCatalog}
        />

    );


}
