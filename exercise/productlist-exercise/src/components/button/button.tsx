import React, {Dispatch, SetStateAction, useContext} from "react";
import {UserCart} from "../../customHooks";
import {UserContext} from "../../context";
import {getCart} from "../../dataFetchingFile";

export function Button({id, userCartCatalog, setUserCartCatalog}: {
    id: number;
    userCartCatalog: UserCart;
    setUserCartCatalog: Dispatch<SetStateAction<UserCart>>;
}) {
    const totalProducts = userCartCatalog?.carts[0]?.products;

    let shouldRenderAddToCart = true;

    const userContext = useContext(UserContext);
    if (userContext === undefined) {
        throw new Error("UserContext is not provided correctly.");
    }
    const {userPrevCartCatalog, setUserPrevCartCatalog} = userContext

    async function handleProductButton(id: number, quantity?: number, isDelete?: boolean) {
        if (quantity === undefined) {
            quantity = 0;
        }
        const updatedProduct = {id: id, quantity: isDelete ? quantity - 1 : quantity + 1};
        const updatedCart = userPrevCartCatalog ? [...userPrevCartCatalog, updatedProduct] : [updatedProduct];
        console.log(updatedCart);

        setUserPrevCartCatalog(updatedCart);
        try {
            const response = await fetch(getCart(), {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    merge: true,
                    products: updatedCart,

                }),
            });
            const data = await response.json()
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
            // console.log('cartCatalog',userPrevCartCatalog);

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
                        <div key={product.id} className="product-quantity-button">
                            <button onClick={() => handleProductButton(id, product.quantity)}>+</button>
                            <div className="product-quantity-button-text">{product.quantity}</div>
                            <button onClick={() => handleProductButton(product.id, product.quantity, true)}>-</button>
                        </div>
                    );
                } else {
                    return null;
                }
            })}

            {shouldRenderAddToCart && (
                <button onClick={() => handleProductButton(id)}>Add to Cart</button>
            )}
        </div>
    );


}
