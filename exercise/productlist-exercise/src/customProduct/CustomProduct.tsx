import React, {useContext} from 'react';
import {UserContext} from "../context";
import ProductList from "../components/ProductList/ProductsList";
import {CustomProductHeader} from "./CustomProductHeader";

const Home = () => {
    // const [searchBoxResult, setSearchBoxResult] = useState<string>("");
    const userContext = useContext(UserContext);

    if (!userContext) {
        throw new Error("UserContext is not provided correctly.");
    }
    const {customProducts} = userContext;
    const {userCart, setUserCart} = userContext;

    if (!userCart) {
        return (<h1>No Items in Cart</h1>)
    }


    return (
        <>
            <CustomProductHeader/>
            <ProductList
                productListWithQuantity={customProducts}
                userCartCatalog={userCart}
                setUserCartCatalog={setUserCart}
                loading={false}
            />
        </>
    );
};

export default Home;
