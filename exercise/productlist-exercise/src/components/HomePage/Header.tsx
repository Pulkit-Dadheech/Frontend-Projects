import React, {useEffect, useState} from "react";
import './Header.css';
import {useCategoryList} from "../customHooks/CategoryList";
import {useGetUserDetails} from "../customHooks/UserDetails";
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
                <div className="search-container">
                    <input
                        className="search-box"
                        type="text"
                        placeholder="Search.."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <span
                            className="clear-button"
                            onClick={() => setSearchTerm("")}
                        >&#10060;
                        </span>
                    )}
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
                <div id="custom-product-listing">
                    <Link to="/custom-product">Custom-Products</Link>
                </div>
                <div id="custom-form">
                    <Link to="/form">Create-Custom-Product</Link>
                </div>
                <div id="cart">
                    <Link to="/cart">{userName}</Link>
                </div>
            </div>
        </>
    );
}
