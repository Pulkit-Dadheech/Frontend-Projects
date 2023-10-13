import React from "react";
import {UserCart} from "../../customHooks";


export function Button({id, userCartCatalog}: {
    id: number,
    userCartCatalog: UserCart | undefined
}) {
    const totalProducts = userCartCatalog?.carts[0].products;

    let shouldRenderAddToCart = true;

    return (
        <div>
            {totalProducts?.map((product) => {
                if (product.id === id && product.quantity > 0) {
                    console.log(product);
                    shouldRenderAddToCart = false;
                    return (
                        <div key={product.id} id="product-quantity-button">
                            <button onClick={handleAddProduct}>-</button>
                            <div style={{padding: "5px"}}>{product.quantity}</div>
                            <button onClick={handleDeleteProduct}>+</button>
                        </div>
                    );
                } else {
                    return null;
                }
            })}

            {shouldRenderAddToCart && (
                <button onClick={handleAddToCart}>Add to Cart</button>
            )}
        </div>
    );


    function handleAddProduct() {

    }

    function handleDeleteProduct() {

    }

    function handleAddToCart() {

    }
}
