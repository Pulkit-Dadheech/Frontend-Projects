import React, {useEffect} from "react";
import  {useProductList} from "../customHooks/ProductList";
import {listWithQuantity, UserCart} from "../../dataTypes";
import "./ProductComponent.css";
import ProductList from "../ProductList/ProductsList";
import Paginator from "../Pagination/paginator";
import {useSearchParams} from "react-router-dom";
import {usePagination} from "../customHooks/Pagination"

interface ShoppingCartProps {
    searchBoxResult?: string;
    category?: string;
    userCartCatalog: UserCart;
    setUserCartCatalog: React.Dispatch<React.SetStateAction<UserCart | null>>;
}

export default function Product(props: ShoppingCartProps) {

    const [query,setQuery]=useSearchParams();
    const queryPage=(query.get('p'));
    const initialPage = queryPage? parseInt(queryPage) : 1;

    const {currentPage, setCurrentPage, itemsPerPage, setItemsPerPage} = usePagination(initialPage);
    const skippedProducts = (currentPage - 1) * itemsPerPage;

    const {productCatalog, productError, loading} = useProductList(props.searchBoxResult, props.category, skippedProducts, itemsPerPage);

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
                       itemsPerPage={itemsPerPage}
                       setItemsPerPage={setItemsPerPage}
                       setQuery={setQuery}
            />
        </>
    );


}
