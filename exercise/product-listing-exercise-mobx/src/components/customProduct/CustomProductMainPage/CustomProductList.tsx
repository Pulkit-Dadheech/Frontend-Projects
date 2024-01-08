import React, {useEffect} from "react";
import {TSingleCustomProduct} from "../../../types/allTypes";
import {observer} from "mobx-react-lite";
import {ButtonUtils} from "../../Button/buttonUtils";
import {useRootStore} from "../../../Context/RootContext";
import {NotFoundComponent} from "../../NoSearchResultFound/NotFoundComponent";
import {ListTableStore} from "../../../store/ListTableStore";
import {SessionStorageGetter} from "../../SessionStorageHandler/SessionStorageHandler";
import {FormStore} from "../../../store/FormStore";

export const CustomProductList = observer(() => {
    const {formStore} = useRootStore();
    const store = formStore.customFormStore;

    useEffect(() => {
        const customProductDataBeforeRefresh=SessionStorageGetter('customProducts');
        const customProductIdBeforeRefresh=SessionStorageGetter('customProductId')

        if(customProductIdBeforeRefresh){
            formStore.updateCustomId(+customProductIdBeforeRefresh+1);
        }

        if(!store.data && customProductDataBeforeRefresh){
            store.setData(customProductDataBeforeRefresh);
        }
    }, []);
    const fetchDiscountPrice = (discount: number, price: number) => {
        return Math.round(price - (discount / 100) * price);
    }

    if (!store.data) {
        return (
            <NotFoundComponent route={'customForm'}/>
        )
    }

    return (
        <>
            {store.data &&
                store.data.map((cartProduct: TSingleCustomProduct) => (
                    <div key={cartProduct.id} className="product-information">
                        <div className={"product-image"}>
                            <img src={cartProduct.images[0]} alt="Cart List" height="170"/>
                        </div>
                        <div className={"product-description"}>
                            <h3>Name: {cartProduct.title}</h3>
                            <h4>
                                Price: <>
                                {fetchDiscountPrice(cartProduct.discountPercentage, cartProduct.price)}
                                <span>&#36;</span>
                                (
                                <del>{cartProduct.price}</del>
                                <span>&#36;</span>
                                )
                            </>
                            </h4>
                            <h4>Category: {cartProduct.category}</h4>
                            <p>Description: {cartProduct.description}</p>
                        </div>
                        <div className={"product-rating"}>
                            <ButtonUtils<ListTableStore<FormStore<any>>> quantity={cartProduct.quantity} id={cartProduct.id}
                                                              stock={cartProduct.total} isCustom={true}
                                                              store={store} data={store.data}/>
                        </div>
                    </div>
                ))
            }
        </>
    )
})