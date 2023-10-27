import React, {useContext, useState} from 'react';
import './App.css';
import Header from "./components/HomePage/Header";
import Product from "./components/HomePage/ProductComponent";
import {UserContext} from "./context";

function App() {
    const userContext = useContext(UserContext);

    if (!userContext) {
        throw new Error("UserContext is not provided correctly.");
    }

    const {userCart, setUserCart,selectedUser,setSelectedUser,setSelectedUserId} = userContext;

    const [searchBoxResult, setSearchBoxResult] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    if (!userCart) {
        return <><h1>Loading...</h1></>;
    }

    return (
        <>
            <Header
                setSearchBoxResult={setSearchBoxResult}
                setSelectedCategory={setSelectedCategory}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                setSelectedUserId={setSelectedUserId}
            />
            <Product
                searchBoxResult={searchBoxResult}
                category={selectedCategory}
                userCartCatalog={userCart}
                setUserCartCatalog={setUserCart}
            />
        </>
    );
}

export default App;
