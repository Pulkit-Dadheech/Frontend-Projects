import React from "react";
import {useRouterStore} from "mobx-state-router";

export const NotFoundComponent = () => {
    const router=useRouterStore();
    return (
        <div className={"cart-no-product-found"}>
            <h1>No Product Found</h1>
            <button onClick={() => router.goTo('home')}>Add New Products</button>
        </div>
    )
}
