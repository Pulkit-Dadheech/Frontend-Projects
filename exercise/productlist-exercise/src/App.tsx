import React, {useState} from 'react';
import './App.css';
import Header from "./components/Header";
import ProductComponent from "./components/ProductComponent";

function App() {
    const [searchBoxResult, setSearchBoxResult] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    return (
        <>

            <Header searchBoxResult={searchBoxResult}
                     selectedCategory={selectedCategory}
                     setSearchBoxResult={setSearchBoxResult}
                     setSelectedCategory={setSelectedCategory}/>
            <ProductComponent searchBoxResult={searchBoxResult} category={selectedCategory}/>
        </>
    );
}

export default App;
