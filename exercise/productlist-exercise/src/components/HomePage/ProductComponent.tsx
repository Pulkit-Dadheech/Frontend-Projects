import React, {Dispatch, SetStateAction, useState} from "react";
import {usePagination, useProductList} from "../../customHooks";
import {listWithQuantity, UserCart} from "../../dataTypes";
import "./ProductComponent.css";
import ProductList from "../ProductList/ProductsList";
import Paginate from "../Pagination/paginate";

export default function Product(props: {
    searchBoxResult?: string;
    category?: string,
    userCartCatalog: UserCart,
    setUserCartCatalog: Dispatch<SetStateAction<UserCart | null>>;
},) {

    const [categoryCurrentPage, setCategoryCurrentPage] = useState<number>(1);
    const {currentPage, setCurrentPage, itemsPerPage} = usePagination();
    const skippedProducts = props.category ? (categoryCurrentPage - 1) * itemsPerPage : (currentPage - 1) * itemsPerPage;

    const {
        productCatalog,
        productError,
        loading
    } = useProductList(props.searchBoxResult, props.category, skippedProducts, itemsPerPage);
    const {userCartCatalog} = props;

    if (loading) {
        return (<h1>fetching user cart...</h1>)
    }
    if (productError) {
        return (<h1>Error Fetching Product Catalog</h1>);
    }


    const productListWithQuantity: listWithQuantity = productCatalog?.products.map((product) => {
        return {
            ...product,
            quantity: userCartCatalog.carts[0].products.find((p) => p.id === product.id)?.quantity || 0
        }
    })
    return (<>
            <ProductList
                productListWithQuantity={productListWithQuantity}
                userCartCatalog={props.userCartCatalog}
                setUserCartCatalog={props.setUserCartCatalog}
                loading={loading}
            />
            <Paginate totalProducts={productCatalog?.total ?? 0}
                      currentPage={props.category ? categoryCurrentPage : currentPage}
                      setCurrentPage={props.category ? setCategoryCurrentPage : setCurrentPage}
            />
        </>
    );


}
