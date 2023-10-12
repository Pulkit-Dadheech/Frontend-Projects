import React, {useEffect, useState} from "react";
import './Header.css';
import ProductComponent from "./ProductComponent";
import {useCategoryList} from "../useProductList";

type headerType =
    {
        searchBoxResult: string;
        selectedCategory: string;
        setSearchBoxResult: (value: string) => void;
        setSelectedCategory: (value: string) => void;
    }


export default function Header({searchBoxResult, selectedCategory, setSearchBoxResult, setSelectedCategory}: headerType) {
    const categoryList = useCategoryList();
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setSearchBoxResult(searchTerm);
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])


    return (
        <>
            <div className={"Header-Elements"}>
                <div>
                    <input
                        className="Search-Box"
                        type="text"
                        placeholder="Search.."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                </div>
                <div>
                    <select onChange={(e) => {
                        if (e.target.value !== 'All') {

                            setSelectedCategory(e.target.value)
                        } else {
                            setSelectedCategory("")
                        }

                    }} className="Product-Category">
                        <option>All</option>
                        {categoryList?.map((category: string, index: number) => (
                            <option key={index}>{category}</option>
                        ))}
                    </select>
                </div>
                <div id="cart">
                    Bob's Cart
                </div>
            </div>
            <ProductComponent searchBoxResult={searchBoxResult} category={selectedCategory}/>
        </>
    );
}
