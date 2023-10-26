import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {UserCart} from "../../dataTypes";
import {UserContext} from "../../context";
import {CartButton} from "./CartButton";
import {apiQueries, createApiUrl} from "../../dataFetchingFile";

export function ButtonUtils({id, userCartCatalog, setUserCartCatalog, quantity}: {
    id: number;
    userCartCatalog: UserCart;
    setUserCartCatalog: Dispatch<SetStateAction<UserCart | null>>;
    quantity?: number
}) {

    const userContext = useContext(UserContext);

    if (!userContext) {
        throw new Error("UserContext is not provided correctly.");
    }

    const {userPrevCartCatalog, setUserPrevCartCatalog} = userContext
    const [userCartId, setUserCartId] = useState<number>(0);
    const {setCustomProducts} = userContext;

    function onAdd(id: number, quantity?: number) {
        if (id > 100) {
            setCustomProducts((prevProducts) => {
                return prevProducts.map((product) => {
                    if (product.id === id) {
                        return {
                            ...product,
                            quantity: product.quantity+1,
                        };
                    }
                    return product;
                });
            });
        } else {
            AddOrRemoveProductFromCart(id, quantity, false)
        }
    }

    function onDelete(id: number, quantity?: number) {
        if (id > 100) {
            setCustomProducts((prevProducts) => {
                return prevProducts.map((product) => {
                    if (product.id === id) {
                        return {
                            ...product,
                            quantity: quantity !== 0 ? product.quantity-1 : 0,
                        };
                    }
                    return product;
                });
            });
        } else {
            AddOrRemoveProductFromCart(id, quantity, true)
        }
    }

    useEffect(() => {
        const userCartIdNumber = userCartCatalog.carts[0].id;
        setUserCartId(userCartIdNumber)
    }, [userCartId]);

    async function AddOrRemoveProductFromCart(
        id: number,
        quantity: number | undefined,
        isDelete?: boolean,
    ) {

        if (!quantity) {
            quantity = 0;
        }
        const updatedProduct = {id: id, quantity: isDelete ? quantity - 1 : quantity + 1};
        const updatedCarts = userPrevCartCatalog ? [...userPrevCartCatalog, updatedProduct] : [updatedProduct];

        interface LatestItems {
            [id: number]: { id: number; quantity: number };
        }

        let filteredProducts: LatestItems = {};
        updatedCarts.forEach((item, index) => {
                filteredProducts[item.id] = item;
            }
        )

        if (setUserPrevCartCatalog) {
            setUserPrevCartCatalog(updatedCarts);
        }
        try {
            const response = await fetch(createApiUrl(apiQueries.AddToCart, userCartId), {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    merge: true,
                    products: Object.values(filteredProducts),

                }),
            });
            const data = await response.json()
            if (setUserCartCatalog && userCartCatalog) {
                setUserCartCatalog({
                    carts: Array(data),
                    total: userCartCatalog.total,
                    skip: userCartCatalog.skip,
                    limit: userCartCatalog.limit,
                });
            } else {
                console.error("userCartCatalog is undefined or setUserCartCatalog is not available");
            }

        } catch (error) {
            console.error("An error occurred while updating the cart:", error);
        }
    }

    return (
        <>
            <CartButton id={id} onAdd={onAdd} onDelete={onDelete} quantity={quantity}/>
        </>
    );

}