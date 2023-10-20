import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {listWithQuantity, Product, UserCart} from "../../dataTypes";
import {apiQueries, createApiUrl} from "../../dataFetchingFile";
import ProductList from "../ProductList/ProductsList";
import Paginate from "../Pagination/paginate";
import {usePagination} from "../../customHooks";


export default function CartProductsList({userCartCatalog, setUserCartCatalog, loading}: {
    userCartCatalog: UserCart;
    setUserCartCatalog: Dispatch<SetStateAction<UserCart | null>>;
    loading: boolean;
}) {

    const [userCartProducts, setUserCartProducts] = useState<Product[]>();

    const productsList = userCartCatalog.carts[0].products;
    const filteredproductsList = productsList.filter((product) => product.quantity !== 0);
    const {currentPage, setCurrentPage, itemsPerPage} = usePagination()

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
    const productListWithQuantity: listWithQuantity = filterProducts?.map((product) => {
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
            <Paginate totalProducts={filterProducts?.length ?? 0}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
            />
        </>
    );
}

