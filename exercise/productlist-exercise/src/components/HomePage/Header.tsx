import React, {useContext, useEffect, useState} from "react";
import './Header.css';
import {useCategoryList} from "../customHooks/CategoryList";
import {Link} from "react-router-dom";
import useFetch, {apiQueries, createApiUrl} from "../../dataFetchingFile";
import {IUserData} from "../../dataTypes";
import {UserContext} from "../../context";

type headerType =
    {
        setSearchBoxResult: (value: string) => void;
        setSelectedCategory: (value: string) => void;
    }

export default function Header({
                                   setSearchBoxResult,
                                   setSelectedCategory,
                               }: headerType) {

    const userContext = useContext(UserContext);

    if (!userContext) {
        throw new Error("UserContext is not provided correctly.");
    }


    const {selectedUserDetails,setSelectedUserDetails}=userContext;
    const {categoryList, categoryError} = useCategoryList();
    const {data: userList, error: userListError} = useFetch<IUserData>(createApiUrl(apiQueries.User));
    const [searchTerm, setSearchTerm] = useState('')

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
    if (!userList) {
        return (<div>Fetching User Details...</div>)
    }
    if (userListError) {
        return (<h1>Error Fetching User List</h1>)
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
                        if (e.target.value !== 'Users') {
                            setSelectedUserDetails({...selectedUserDetails,name: e.target.value});
                            if (!!userList.users.length) {
                                const selectedUser = userList.users.find((user) => `${user.firstName} ${user.lastName}` === e.target.value);
                                if (selectedUser) {
                                    setSelectedUserDetails({...selectedUserDetails,id: selectedUser.id});
                                }
                            }
                        }
                    }} className="product-category-list">
                        <option>Users</option>
                        {userList.users?.map((user) => (
                            <option key={user.id}>{`${user.firstName} ${user.lastName}`}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select onChange={(e) => {
                        if (e.target.value !== 'All') {
                            setSelectedCategory(e.target.value)
                        } else {
                            setSelectedCategory("")
                        }

                    }} className="users-list">
                        <option>All</option>
                        {categoryList?.map((category: string, index: number) => (
                            <option key={index}>{category}</option>
                        ))}
                    </select>
                </div>
                <div id="custom-product-listing">
                    <Link to="/custom-product">Custom Products</Link>
                </div>
                <div id="custom-form">
                    <Link to="/form">Add Custom Product</Link>
                </div>
                <div id="cart">
                    <Link to="/cart">{selectedUserDetails.name}</Link>
                </div>
            </div>
        </>
    );
}
