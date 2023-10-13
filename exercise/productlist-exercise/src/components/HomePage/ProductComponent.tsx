import React from "react";
import {ProductCatalog, useGetUserCart, useProductList} from "../../customHooks";
import "./ProductComponent.css";
import {Button} from "../button/button";

export default function ProductComponent(props: { searchBoxResult?: string; category?: string },) {

    const productCatalog: ProductCatalog | undefined = useProductList(props.searchBoxResult, props.category);
    const userCartCatalog = useGetUserCart();


    const fetchDiscountPrice = (discount: number, price: number) => {
        return Math.round(price - (discount / 100) * price);
    }
    return (
        <div>
            {productCatalog && productCatalog.products.length > 0 ? (
                productCatalog.products.map((product) => (
                    <div key={product.id} className="Product-Information">
                        <div className={"product-image"}>
                            <img src={product.images[0]} alt="Product List" height="100"/>

                        </div>
                        <div className={"product-description"}>
                            <h3>Name: {product.title}</h3>
                            <h4>Price:
                                <>
                                    {fetchDiscountPrice(product.discountPercentage, product.price)}
                                    <span>&#36;</span>
                                    (
                                    <del>{product.price}</del>
                                    <span>&#36;</span>
                                    )
                                </>
                            </h4>
                            <h4>Category: {product.category}</h4>
                            <p>Description: {product.description}</p>
                        </div>
                        <div className={"product-rating"}>
                            <p>Rating: {product.rating}</p>
                            <Button id={product.id} userCartCatalog={userCartCatalog}/>
                        </div>
                    </div>
                ))
            ) : (
                <h1 className={"Product-Header"}>No Items Found!</h1>
            )}
        </div>
    );


}
