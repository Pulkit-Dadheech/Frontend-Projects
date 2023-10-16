import React, {useEffect, useState} from "react";
import './Header.css';
import {useCategoryList, useGetUserDetails} from "../../customHooks";
import {Link} from "react-router-dom";

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
    const userDetails=useGetUserDetails();
    const userName=`${userDetails?.firstName} ${userDetails?.lastName}`;

    useEffect(() => {
        const delayDebounceFunction = setTimeout(() => {
            setSearchBoxResult(searchTerm);
        }, 500)

        return () => clearTimeout(delayDebounceFunction)
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
                    <Link to="/cart">{userName}</Link>
                </div>
            </div>
        </>
    );
}
