import React, {useEffect} from "react";
import {usePagination, useProductList} from "../../customHooks";
import {listWithQuantity, UserCart} from "../../dataTypes";
import "./ProductComponent.css";
import ProductList from "../ProductList/ProductsList";
import Paginator from "../Pagination/paginator";

interface ShoppingCartProps {
    searchBoxResult?: string;
    category?: string;
    userCartCatalog: UserCart;
    setUserCartCatalog: React.Dispatch<React.SetStateAction<UserCart | null>>;
}

export default function Product(props: ShoppingCartProps) {

    const {currentPage, setCurrentPage, itemsPerPage} = usePagination(props.category, props.searchBoxResult);
    const skippedProducts = (currentPage - 1) * itemsPerPage;


    const {
        productCatalog,
        productError,
        loading
    } = useProductList(props.searchBoxResult, props.category, skippedProducts, itemsPerPage);

    useEffect(() => {
        if (props.category && props.searchBoxResult) {
            setCurrentPage(1);
        }
        if (props.category) {
            setCurrentPage(1);
        }
        if (props.searchBoxResult) {
            setCurrentPage(1);
        }
    }, [props.category, props.searchBoxResult, setCurrentPage]);
    
    

    const {userCartCatalog} = props;

    if (loading) {
        return (<h1>Fetching Products...</h1>)
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
            <Paginator totalProducts={productCatalog?.total ?? 0}
                       currentPage={currentPage}
                       setCurrentPage={setCurrentPage}
            />
        </>
    );


}
