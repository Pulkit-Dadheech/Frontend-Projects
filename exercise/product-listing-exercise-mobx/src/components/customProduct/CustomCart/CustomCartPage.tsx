import {useRootStore} from "../../../Context/RootContext";
import {TSingleCustomProduct} from "../../../types/allTypes";
import {Cart} from "../../GenericCart/Cart";
import {NotFoundComponent} from "../../NoSearchResultFound/NotFoundComponent";
import React from "react";
import {CustomCartHeader} from "./CustomCartHeader";

export const CustomCartPage = () => {
    const {customProduct} = useRootStore();
    const cartTotalProducts = customProduct.customProductStore.data?.filter((product: TSingleCustomProduct) => product.quantity > 0).length;

    if (!customProduct.customProductStore.data || cartTotalProducts === 0) {
        return (
            <NotFoundComponent route={'customProduct'}/>
        )
    }
    return (
        <>
            <CustomCartHeader/>
            <Cart<TSingleCustomProduct>
                data={customProduct.customProductStore.data?.filter((product) => product.quantity > 0)} isCustom={true}/>
        </>
    )
}