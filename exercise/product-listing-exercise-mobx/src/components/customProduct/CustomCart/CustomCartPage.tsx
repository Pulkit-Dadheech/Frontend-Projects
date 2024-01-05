import {useRootStore} from "../../../Context/RootContext";
import {TCustomProduct, TSingleCustomProduct} from "../../../types/allTypes";
import {Cart} from "../../GenericCart/Cart";
import {NotFoundComponent} from "../../NoSearchResultFound/NotFoundComponent";
import React, {useEffect} from "react";
import {CustomCartHeader} from "./CustomCartHeader";
import {ListTableStore} from "../../../store/ListTableStore";
import {observer} from "mobx-react-lite";
import {SessionStorageGetter} from "../../SessionStorageHandler/SessionStorageHandler";

export const CustomCartPage = observer(() => {
    const {customProduct} = useRootStore();
    const cartTotalProducts = customProduct.customProductStore.data?.filter((product: TSingleCustomProduct) => product.quantity > 0).length;

    useEffect(() => {
        const customProductDataBeforeRefresh=SessionStorageGetter('customProducts');
        const customProductIdBeforeRefresh=SessionStorageGetter('customProductId')

        if(customProductIdBeforeRefresh){
            customProduct.updateCustomProductId(+customProductIdBeforeRefresh+1);
        }
        if(!customProduct.customProductStore.data && customProductDataBeforeRefresh){
            customProduct.customProductStore.setData(customProductDataBeforeRefresh);
        }
    }, []);

    if (!customProduct.customProductStore.data || cartTotalProducts === 0) {
        return (
            <NotFoundComponent route={'customProduct'}/>
        )
    }
    return (
        <>
            <CustomCartHeader/>
            <Cart<ListTableStore<TCustomProduct>>
                data={customProduct.customProductStore.data?.filter((product) => product.quantity > 0)} isCustom={true}
                store={customProduct.customProductStore}/>
        </>
    )
})