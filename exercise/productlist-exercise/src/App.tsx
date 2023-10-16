import React, {useContext, useState} from 'react';
import './App.css';
import Header from "./components/HomePage/Header";
import ProductComponent from "./components/HomePage/ProductComponent";
import {UserContext} from "./context";

function App() {
    const userContext = useContext(UserContext);

    if (userContext === undefined) {
        throw new Error("UserContext is not provided correctly.");
    }

    const {userCart, setUserCart} = userContext;

    const [searchBoxResult, setSearchBoxResult] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    if (!userCart) {
        return <></>;
    }
    console.log(userCart);
    return (
        <>
            <Header
                searchBoxResult={searchBoxResult}
                selectedCategory={selectedCategory}
                setSearchBoxResult={setSearchBoxResult}
                setSelectedCategory={setSelectedCategory}
            />
            <ProductComponent
                searchBoxResult={searchBoxResult}
                category={selectedCategory}
                userCartCatalog={userCart}
                setUserCartCatalog={setUserCart}
            />
        </>
    );
}

export default App;
