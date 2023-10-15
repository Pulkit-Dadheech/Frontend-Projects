import React, { Dispatch, SetStateAction } from "react";
import { UserCart } from "../../customHooks";

export function Button({
                           id,
                           userCartCatalog,
                           setUserCartCatalog,
                       }: {
    id: number;
    userCartCatalog: UserCart | undefined;
    setUserCartCatalog: Dispatch<SetStateAction<UserCart | undefined>> | undefined;
}) {
    const totalProducts = userCartCatalog?.carts[0].products;

    let shouldRenderAddToCart = true;

    async function handleProduct(id: number, quantity?: number) {
        if (quantity === undefined) {
            quantity = 0;
        }

        try {
            const response = await fetch(`https://dummyjson.com/carts/19`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    merge: true,
                    products: [
                        {
                            id: id,
                            quantity: quantity + 1,
                        },
                    ],
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (setUserCartCatalog) {
                    setUserCartCatalog(data);
                }
            } else {
                console.error("Failed to update the cart.");
            }
        } catch (error) {
            console.error("An error occurred while updating the cart:", error);
        }
    }

    return (
        <div>
            {totalProducts?.map((product) => {
                if (product.id === id && product.quantity > 0) {
                    console.log(product);
                    shouldRenderAddToCart = false;
                    return (
                        <div key={product.id} id="product-quantity-button">
                            <button onClick={() => handleAddProduct(id, product.quantity)}>+</button>
                            <div style={{ padding: "5px" }}>{product.quantity}</div>
                            <button onClick={() => handleDeleteProduct(product.id)}>-</button>
                        </div>
                    );
                } else {
                    return null;
                }
            })}

            {shouldRenderAddToCart && (
                <button onClick={() => handleAddProduct(id)}>Add to Cart</button>
            )}
        </div>
    );

    function handleAddProduct(id: number, quantity?: number) {
        handleProduct(id, quantity);
    }

    function handleDeleteProduct(id: number) {
        // Handle product deletion logic here
    }
}
