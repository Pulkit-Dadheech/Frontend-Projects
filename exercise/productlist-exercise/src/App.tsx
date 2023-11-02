import React, {useContext, useState} from 'react';
import './App.css';
import Header from "./components/HomePage/Header";
import Product from "./components/HomePage/ProductComponent";
import {UserContext} from "./context";

function App() {


    const [searchBoxResult, setSearchBoxResult] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");


    return (
        <>
            <Header
                setSearchBoxResult={setSearchBoxResult}
                setSelectedCategory={setSelectedCategory}
            />
            <Product
                searchBoxResult={searchBoxResult}
                category={selectedCategory}
            />
        </>
    );
}

export default App;
