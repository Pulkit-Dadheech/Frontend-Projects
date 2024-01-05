import React from "react";
import {observer} from "mobx-react-lite";
import {TCartProduct} from "../../types/allTypes";
import {toJS} from "mobx";
import {apiQueries, createApiUrl} from "../../dataFetchingFile";
import {useRootStore} from "../../Context/RootContext";
import {ListTableStore} from "../../store/ListTableStore";
import {SessionStorageGetter, SessionStorageSetter} from "../SessionStorageHandler/SessionStorageHandler";
interface userCartItemsWithQuantity {
    [id: number]: { id: number; quantity: number };
}
export const CartQuantityButton = observer(<T extends ListTableStore<any>,>({quantity, id, stock,isCustom,data,store}: { quantity: number, id: number, stock: number ,isCustom:boolean,data: any,store:T}) => {

    const {cart} = useRootStore();


    function onAdd(id: number, isCustom: boolean, stock: number, quantity: number) {

        if (isCustom) {
            console.log(toJS(store.data));
            const result = data.map((product: TCartProduct) => {
                if (product.id === id && quantity<=stock) {
                    return {
                        ...product,
                        quantity: product.quantity + 1,
                    };
                }
                return {...product};
            })
            if(store.data.carts) {
                const newStore = {
                    carts: [{
                        ...store.data.carts[0],
                        products: result
                    }],
                    limit: store.data.limit,
                    skip: store.data.skip,
                    total: store.data.total
                }
                SessionStorageSetter('cartProducts',newStore);
                store.setData(newStore);
            }
            else{
                SessionStorageSetter('customProducts',result);
                store.setData(result);
            }
        } else {
            AddOrRemoveProductFromCart(id, quantity, false)
        }
    }

    function onDelete(id: number, isCustom: boolean, stock: number, quantity: number) {
        if (isCustom) {
            console.log(toJS(store.data));
            const result = data.map((product: TCartProduct) => {
                if (product.id === id) {
                    return {
                        ...product,
                        quantity: product.quantity - 1,
                    };
                }
                return {...product};
            })
            if(store.data.carts) {
                const newStore = {
                    carts: [{
                        ...store.data.carts[0],
                        products: result
                    }],
                    limit: store.data.limit,
                    skip: store.data.skip,
                    total: store.data.total
                }
                SessionStorageSetter('cartProducts',newStore);
                store.setData(newStore);
            }
            else{
                SessionStorageSetter('customProducts',result);
                store.setData(result);
            }
        } else {
            AddOrRemoveProductFromCart(id, quantity, true)
        }
    }

    async function AddOrRemoveProductFromCart(
        id: number,
        quantity: number | undefined,
        isDelete?: boolean,
    ) {

        if (!quantity) {
            quantity = 0;
        }

        let prevCartQuantitySessionData;
        if(cart.cartStore.prevUserId === cart.cartStore.userId){
            prevCartQuantitySessionData= SessionStorageGetter('userPrevCartQuantityData');
            cart.setUserPrevCartQuantityData(prevCartQuantitySessionData);
        }
        const updatedProduct = {id: id, quantity: isDelete ? quantity - 1 : quantity + 1};
        const updatedCarts = cart.userPrevCartQuantityData ? [...cart.userPrevCartQuantityData, updatedProduct] : [updatedProduct];

        let filteredProducts: userCartItemsWithQuantity = {};
        updatedCarts.forEach((item) => {
                filteredProducts[item.id] = item;
            }
        )
        SessionStorageSetter('userPrevCartQuantityData',updatedCarts);

        cart.setUserPrevCartQuantityData(updatedCarts);

        try {
            const response = await fetch(createApiUrl(apiQueries.AddToCart, store.data.carts[0].id), {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    merge: true,
                    products: Object.values(filteredProducts),
                }),
            });
            if (!response.ok) {
                createNewCart(filteredProducts,isDelete);
            } else {
                const data = await response.json();
                store.setData({
                    carts: Array(data),
                    total: store.data.total,
                    skip: store.data.skip,
                    limit: store.data.limit,
                });
                SessionStorageSetter('cartProducts',{
                    carts: Array(data),
                    total: store.data.total,
                    skip: store.data.skip,
                    limit: store.data.limit,
                });
                console.log("this is store data after updating", toJS(store.data));
            }
        } catch (error) {
            createNewCart(filteredProducts,isDelete);
        }
    }

    async function createNewCart(filteredProducts:userCartItemsWithQuantity,isDelete: boolean | undefined){
        const response = await fetch(createApiUrl(apiQueries.AddANewCart), {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userId: store.userId,
                products: Object.values(filteredProducts)
            })
        });
        let responseReceived = await response.json();

        if (responseReceived && isDelete && quantity === 1) {
            responseReceived.products = responseReceived.products.map((product: TCartProduct) => {
                if (product.id === id) {
                    return {
                        ...product,
                        quantity: +product.quantity - 1,
                    };
                }
                return product;
            });
        }
        store.setData({
            carts: [responseReceived],
            total: 1,
            skip: 0,
            limit: 100
        });
        SessionStorageSetter('cartProducts',{
            carts: [responseReceived],
            total: 1,
            skip: 0,
            limit: 100
        })
    }


    return (<>
        {<div key={id} className="product-quantity-button">
            <button onClick={() => onAdd(id, isCustom, stock, quantity)}>{!quantity ? "Add to Cart" : "+"}</button>
            <span className={!!quantity ? 'display-inline' : 'display-none'}>
                <span className="product-quantity-button-text">{quantity}</span>
                <button onClick={() => onDelete(id, isCustom, stock, quantity)}>-</button>
            </span>
        </div>
        }
    </>)
})