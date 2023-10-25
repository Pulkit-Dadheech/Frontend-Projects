import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {listsWithQuantity, Product, UserCart} from "../../dataTypes";
import {apiQueries, createApiUrl} from "../../dataFetchingFile";
import ProductList from "../ProductList/ProductsList";
import Paginator from "../Pagination/paginator";
import {usePagination} from "../customHooks/Pagination";
import {useSearchParams} from "react-router-dom";


export default function CartProductsList({userCartCatalog, setUserCartCatalog, loading}: {
    userCartCatalog: UserCart;
    setUserCartCatalog: Dispatch<SetStateAction<UserCart | null>>;
    loading: boolean;
}) {

    const [query,setQuery]=useSearchParams();
    const queryPage=(query.get('p'));
    const initialPage = queryPage? parseInt(queryPage) : 1;
    const [userCartProducts, setUserCartProducts] = useState<Product[]>();

    const productsList = userCartCatalog.carts[0].products;
    const filteredproductsList = productsList.filter((product) => product.quantity !== 0);
    const {currentPage, setCurrentPage, itemsPerPage,setItemsPerPage} = usePagination(initialPage);

    useEffect(() => {
        if (filteredproductsList) {
            const fetchProductData = async () => {
                const productPromises = filteredproductsList.map(async (product) => {
                    const response = await fetch(createApiUrl(apiQueries.SingleProduct, product.id));
                    return await response.json();
                });
                const productData = await Promise.all(productPromises);
                setUserCartProducts(productData);
            };
            fetchProductData();
        }
    }, []);


    let filterProducts = userCartProducts;

    const filteredCartWithNoProducts = userCartCatalog.carts[0].products.filter((product) => product.quantity !== 0)
    if (filteredCartWithNoProducts.length >= 0) {
        filterProducts = userCartProducts?.filter((product) => {
            return !!filteredCartWithNoProducts.filter((filterProduct) => filterProduct.id === product.id).length;
        });
    }
    const productListWithQuantity: listsWithQuantity = filterProducts?.map((product) => {
        return {
            ...product,
            quantity: userCartCatalog.carts[0].products.find((p) => p.id === product.id)?.quantity || 0
        }
    })

    const ProductListWithQuantity = productListWithQuantity?.slice((currentPage - 1) * itemsPerPage, (currentPage) * itemsPerPage);

    return (
        <>
            <ProductList
                productListWithQuantity={ProductListWithQuantity}
                userCartCatalog={userCartCatalog}
                setUserCartCatalog={setUserCartCatalog}
                loading={loading}
            />
            <Paginator totalProducts={filterProducts?.length ?? 0}
                       currentPage={currentPage}
                       setCurrentPage={setCurrentPage}
                       itemsPerPage={itemsPerPage}
                       setItemsPerPage={setItemsPerPage}
                       setQuery={setQuery}
            />
        </>
    );
}

