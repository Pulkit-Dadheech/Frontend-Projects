import React, { Dispatch, SetStateAction,useState } from "react";
import { UserCart } from "../../customHooks";

export function Button({id, userCartCatalog, setUserCartCatalog,}: { id: number; userCartCatalog: UserCart | undefined; setUserCartCatalog: Dispatch<SetStateAction<UserCart | undefined>> | undefined;
}) {
    const [userPrevCartCatalog,setUserPrevCartCatalog]=useState<{
        id: number,
        quantity: number
    }[]>();
    const totalProducts = userCartCatalog?.carts[0]?.products;

    let shouldRenderAddToCart = true;

    async function handleAddProduct(id: number, quantity?: number,isDelete?: boolean) {
        if (quantity === undefined) {
            quantity = 0;
        }
        const updatedProduct = { id: id, quantity: isDelete? quantity - 1:quantity+1 };
        const updatedCart = userPrevCartCatalog ? [...userPrevCartCatalog, updatedProduct] : [updatedProduct];
        console.log(updatedCart);

        try {
            const response = await fetch(`https://dummyjson.com/carts/19`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    merge: true,
                    products: updatedCart,

                }),
            });


            if (response.ok) {
                const data = await response.json();
                if (setUserCartCatalog && userCartCatalog) {
                    setUserCartCatalog({
                        carts: Array(data),
                        total: userCartCatalog.total ?? undefined,
                        skip: userCartCatalog.skip ?? undefined,
                        limit: userCartCatalog.limit ?? undefined,
                    });
                } else {
                    console.error("userCartCatalog is undefined or setUserCartCatalog is not available");
                }
            } else {
                console.error("Failed to update the cart.");
            }
            console.log('cartCatalog',userPrevCartCatalog);
            setUserPrevCartCatalog(updatedCart);
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
                            <button onClick={() => handleAddProduct(product.id,product.quantity,true)}>-</button>
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


}
