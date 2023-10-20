import React, {Dispatch, SetStateAction, useState} from "react";
import {useProductList} from "../../customHooks";
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

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [categoryCurrentPage,setCategoryCurrentPage]=useState<number>(1);
    const productsPerPage=4;
    const skippedProducts=props.category ? (categoryCurrentPage-1)*productsPerPage : (currentPage-1)*productsPerPage;


    const {productCatalog, productError, loading} = useProductList(props.searchBoxResult, props.category,skippedProducts,productsPerPage);
    const {userCartCatalog} = props;

    if (loading) {
        return (<h1>fetching user name...</h1>)
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
            <Paginate totalProducts={productCatalog ? productCatalog?.total : null} currentPage={props.category? categoryCurrentPage : currentPage}
                      setCurrentPage={props.category? setCategoryCurrentPage : setCurrentPage} productPerPage={productsPerPage}/>
        </>
    );


}
