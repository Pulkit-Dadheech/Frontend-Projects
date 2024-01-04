import React from "react";
import {observer} from "mobx-react-lite";
import {TCartProduct} from "../../types/allTypes";
import {toJS} from "mobx";
import {apiQueries, createApiUrl} from "../../dataFetchingFile";
import {CartStore} from "../../store/cartStore";

const cart = new CartStore();

export const CartQuantityButton = observer(({quantity, id, stock, store}: { quantity: number, id: number, stock: number, store: any }) => {

    if (store) {
        quantity = store.data?.carts[0]?.products.find((product: any) => product.id === id)?.quantity;
    }

    function onAdd(id: number, isCustom: boolean, stock: number, quantity?: number) {
        if (isCustom) {
            console.log(toJS(store.data));
            const result = store.data?.carts[0].products.map((product: TCartProduct) => {
                if (product.id === id) {
                    return {
                        ...product,
                        quantity: product.quantity + 1,
                    };
                }
                return {...product};
            })

            const newStore = {
                carts: [{
                    ...store.data.carts[0],
                    products: result
                }],
                limit: store.data.limit,
                skip: store.data.skip,
                total: store.data.total
            }
            store.setData(newStore);
        }
    }

    function onDelete(id: number, isCustom: boolean, stock: number, quantity?: number) {
        if (isCustom) {
            console.log(toJS(store.data));
            const result = store.data?.carts[0].products.map((product: TCartProduct) => {
                if (product.id === id) {
                    return {
                        ...product,
                        quantity: product.quantity - 1,
                    };
                }
                return {...product};
            })

            const newStore = {
                carts: [{
                    ...store.data.carts[0],
                    products: result
                }],
                limit: store.data.limit,
                skip: store.data.skip,
                total: store.data.total
            }
            console.log("newStore", newStore);
            store.setData(newStore);
        }
    }

    return (<>
        {<div key={id} className="product-quantity-button">
            <button onClick={() => onAdd(id, false, stock, quantity)}>{!quantity ? "Add to Cart" : "+"}</button>
            <span className={!!quantity ? 'display-inline' : 'display-none'}>
                <span className="product-quantity-button-text">{quantity}</span>
                <button onClick={() => onDelete(id, false, stock, quantity)}>-</button>
            </span>
        </div>
        }
    </>)
})