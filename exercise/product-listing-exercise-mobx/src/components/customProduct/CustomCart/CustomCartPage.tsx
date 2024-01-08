import {useRootStore} from "../../../Context/RootContext";
import {TSingleCustomProduct} from "../../../types/allTypes";
import {Cart} from "../../GenericCart/Cart";
import {NotFoundComponent} from "../../NoSearchResultFound/NotFoundComponent";
import React, {useEffect} from "react";
import {CustomCartHeader} from "./CustomCartHeader";
import {ListTableStore} from "../../../store/ListTableStore";
import {observer} from "mobx-react-lite";
import {SessionStorageGetter} from "../../SessionStorageHandler/SessionStorageHandler";
import {FormStore} from "../../../store/FormStore";
import {IFormProps} from "../CustomProductForm/CustomProductsForm";

export const CustomCartPage = observer(() => {
    const {formStore} = useRootStore();
    const cartTotalProducts = formStore.customFormStore.data?.filter((product: TSingleCustomProduct) => product.quantity > 0).length;

    useEffect(() => {
        const customProductDataBeforeRefresh = SessionStorageGetter('customProducts');
        const customProductIdBeforeRefresh = SessionStorageGetter('customProductId')

        if (customProductIdBeforeRefresh) {
            formStore.updateCustomId(+customProductIdBeforeRefresh + 1);
        }
        if (!formStore.customFormStore.data && customProductDataBeforeRefresh) {
            formStore.customFormStore.setData(customProductDataBeforeRefresh);
        }
    }, []);

    if (!formStore.customFormStore.data || cartTotalProducts === 0) {
        return (
            <NotFoundComponent route={'customProduct'}/>
        )
    }
    return (
        <>
            <CustomCartHeader/>
            <Cart<ListTableStore<FormStore<IFormProps>>>
                data={formStore.customFormStore.data?.filter((product: any) => product.quantity > 0)} isCustom={true}
                store={formStore.customFormStore}/>
        </>
    )
})