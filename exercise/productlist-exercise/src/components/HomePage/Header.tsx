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

export default function Header({
                                   searchBoxResult,
                                   selectedCategory,
                                   setSearchBoxResult,
                                   setSelectedCategory
                               }: headerType) {
    const {categoryList, categoryError} = useCategoryList();
    const [searchTerm, setSearchTerm] = useState('')
    const {userDetails, userDataError} = useGetUserDetails();

    const userName = `${userDetails?.firstName} ${userDetails?.lastName}`;

    useEffect(() => {
        const SearchDelay = setTimeout(() => {
            setSearchBoxResult(searchTerm);
        }, 500)

        return () => clearTimeout(SearchDelay)
    }, [searchTerm
    ])

    if (categoryError) {
        return (<h1>Failed to Fetch Category Data</h1>)
    }
    if (!userDetails) {
        return (<div>Fetching User Details...</div>)
    }
    if (userDataError) {
        return (<h1>Error: {userDataError}</h1>)
    }

    return (
        <>
            <div className={"header-elements"}>
                <div>
                    <input
                        className="search-box"
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

                    }} className="product-category">
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