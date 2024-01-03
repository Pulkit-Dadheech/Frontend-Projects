import React, {useEffect} from "react";
import {TProduct, TProductCatalog} from "../../types/allTypes";
import {observer} from "mobx-react-lite";
import "../../styles/ProductList.css"
import Loader from "../LoadingPage/Loader";
import {PaginationComponent} from "../pagination/PaginationComponent";
import NoResultFound from "../NoSearchResultFound/NoResultFound";


export const ProductComponent = observer(({products}: { products: any }) => {

    useEffect(() => {
        const getProductData = async () => {
            await products.productStore.fetchData();
        }
        getProductData();
    }, []);

    if (products.dataLoading) {
        return <Loader/>

    }
    else if (products.productStore.data?.products.length===0) {
        return <NoResultFound/>
    }


    const fetchDiscountPrice = (discount: number, price: number) => {
        return Math.round(price - (discount / 100) * price);
    }
    return (
        <div>
            {products.productStore.data && products.productStore.data.products &&
                products.productStore.data.products.map((productWithQuantity: TProduct) => (
                    <div key={productWithQuantity.id} className="product-information">
                        <div className={"product-image"}>
                            <img src={productWithQuantity.images[0]} alt="Product List" height="170"/>
                        </div>
                        <div className={"product-description"}>
                            <h3>Name: {productWithQuantity.title}</h3>
                            <h4>
                                Price: <>
                                {fetchDiscountPrice(productWithQuantity.discountPercentage, productWithQuantity.price)}
                                <span>&#36;</span>
                                (
                                <del>{productWithQuantity.price}</del>
                                <span>&#36;</span>
                                )
                            </>
                            </h4>
                            <h4>Category: {productWithQuantity.category}</h4>
                            <p>Description: {productWithQuantity.description}</p>
                        </div>
                        <div className={"product-rating"}>
                            <p>Rating: {productWithQuantity.rating}</p>
                        </div>
                    </div>
                ))
            }
            {products.productStore.data && products.productStore.data.products &&
                <PaginationComponent<any> store={products.productStore}/>}
        </div>
    );
})

