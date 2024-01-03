import React, {useEffect, useState} from "react";
import {TProduct} from "../../types/allTypes";
import {observer} from "mobx-react-lite";
import "../../styles/ProductList.css"
import Loader from "../LoadingPage/Loader";
import {PaginationComponent} from "../pagination/PaginationComponent";
import NoResultFound from "../NoSearchResultFound/NoResultFound";


export const ProductComponent = observer(({products}: { products: any }) => {
    const [productsList, setProductsList] = useState<TProduct[]>();

    useEffect(() => {
        if (products.productStore.category || products.productStore.search) {
            products.productStore.resetSkip();
        }

        const getProductData = async () => {

            const productCatalogDataReceived = await products.productStore.fetchData();
            let filteredProductsWithCategory;

            if (products.productStore.category !== "" && products.productStore.search && products.productStore.search !== ""){
                filteredProductsWithCategory=productCatalogDataReceived.products.filter((product:TProduct)=>{
                    {
                        if( product.title.toUpperCase().includes(products.productStore.search.toUpperCase()) && product.category === products.productStore.category) return product
                    }
                })
            }

            if(filteredProductsWithCategory){
                setProductsList(filteredProductsWithCategory);
            }
            else{
                setProductsList(productCatalogDataReceived.products);
            }
            products.productStore.updateTotal(productCatalogDataReceived.total);
        }

        getProductData();

    }, [products.productStore.skip, products.productStore.search, products.productStore.category]);

    if (products.dataLoading) {
        return <Loader/>
    } else if (!!productsList && !productsList?.length) {
        return <NoResultFound/>
    }

    const fetchDiscountPrice = (discount: number, price: number) => {
        return Math.round(price - (discount / 100) * price);
    }

    return (
        <div>
            {productsList &&
                productsList.map((productWithQuantity) => (
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
            {productsList && <PaginationComponent<any> store={products.productStore}/>}
        </div>
    );
})

