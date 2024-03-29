import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {TProductsWithQuantity, TProduct, TUserCart} from "../../dataTypes";
import {apiQueries, createApiUrl} from "../../dataFetchingFile";
import ProductList from "../ProductList/ProductsList";
import Paginator from "../Pagination/paginator";
import {usePagination} from "../customHooks/Pagination";
import {useSearchParams} from "react-router-dom";
import {CustomProductContext} from "../../CustomProductContext";


export default function CartProductsList({userCartCatalog, setUserCartCatalog, loading}: {
    userCartCatalog: TUserCart | null;
    setUserCartCatalog: Dispatch<SetStateAction<TUserCart | null>>;
    loading: boolean;
}) {

    const [query, setQuery] = useSearchParams();
    const queryPage = (query.get('p'));
    const initialPage = queryPage ? parseInt(queryPage) : 1;
    const [userCartProducts, setUserCartProducts] = useState<TProduct[]>();

    const customProductContext = useContext(CustomProductContext);
    if (!customProductContext) {
        throw new Error("UserContext is not provided correctly.");
    }
    const {customProducts} = customProductContext;


    const productsList = userCartCatalog?.carts[0]?.products || [];
    const filteredProductsList = productsList.filter((product) => product.quantity !== 0);
    const {currentPage, setCurrentPage, itemsPerPage, setItemsPerPage} = usePagination(initialPage);

    useEffect(() => {
        if (filteredProductsList) {
            const fetchProductData = async () => {
                const productPromises = filteredProductsList.map(async (product) => {
                    const response = await fetch(createApiUrl(apiQueries.SingleProduct, product.id));
                    return await response.json();
                });
                const productData = await Promise.all(productPromises);
                setUserCartProducts(productData);
            };
            fetchProductData();
        }
    }, [!!filteredProductsList.length]);

    if (!userCartCatalog || !userCartCatalog.carts || userCartCatalog.carts.length === 0) {
        return <div>Loading...</div>;
    }

    let filterProducts = userCartProducts;

    const filteredCartWithNoProducts = userCartCatalog.carts[0].products.filter((product) => product.quantity !== 0)
    if (filteredCartWithNoProducts.length >= 0) {
        filterProducts = userCartProducts?.filter((product) => {
            return !!filteredCartWithNoProducts.filter((filterProduct) => filterProduct.id === product.id).length;
        });
    }

    const productListWithQuantity: TProductsWithQuantity = filterProducts?.map((product) => {
        return {
            ...product,
            quantity: userCartCatalog.carts[0].products.find((p) => p.id === product.id)?.quantity || 0,
            customProduct: false
        }
    })
    if (customProducts && productListWithQuantity) {
        productListWithQuantity.push(...customProducts)
    }
    const filteredProductListWithQuantity = productListWithQuantity?.filter((productList) => productList.quantity > 0)
    const ProductListWithQuantity = filteredProductListWithQuantity?.slice((currentPage - 1) * itemsPerPage, (currentPage) * itemsPerPage);


    return (
        <>
            <ProductList
                productListWithQuantity={ProductListWithQuantity}
                userCartCatalog={userCartCatalog}
                setUserCartCatalog={setUserCartCatalog}
                loading={loading}
            />
            <Paginator totalProducts={filteredProductListWithQuantity?.length ?? 0}
                       currentPage={currentPage}
                       setCurrentPage={setCurrentPage}
                       itemsPerPage={itemsPerPage}
                       setItemsPerPage={setItemsPerPage}
                       setQuery={setQuery}
            />
        </>
    );
}

