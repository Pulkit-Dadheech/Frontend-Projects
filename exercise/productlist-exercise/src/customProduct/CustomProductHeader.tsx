import React from "react";
import {Link} from "react-router-dom";
import "./CustomHeader.css"

export function CustomProductHeader() {
    return (
        <>
            <div className={"custom-header-elements"}>
                <h1>Custom Products</h1>
                <div id="custom-form">
                    <Link to="/form">Add Product</Link>
                </div>
                <div id="cart">
                    <Link to="/cart">Go to Cart</Link>
                </div>
            </div>
        </>
    )
}