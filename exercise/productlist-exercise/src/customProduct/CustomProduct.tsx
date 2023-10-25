import React, {useState} from 'react';
import Product from "../components/HomePage/ProductComponent";

const Home = () => {
    const [searchBoxResult, setSearchBoxResult] = useState<string>("");

    return (
        <>
            {/*<CustomProductsHeader/>*/}
            {/*<Product*/}
            {/*    searchBoxResult={searchBoxResult}*/}
            {/*    category={selectedCategory}*/}
            {/*    userCartCatalog={userCart}*/}
            {/*    setUserCartCatalog={setUserCart}*/}
            {/*/>*/}
            <h1>Custom Products </h1>
        </>
    );
};

export default Home;
