import React, {useEffect, useState} from "react";
import '../../styles/ProductHeader.css';
import {ProductStore} from "../../store/ProductStore";
import {observer} from "mobx-react-lite";
import {CategoryStore} from "../../store/CategoryStore";

const categories = new CategoryStore();

export const ProductHeader = observer(({products}: { products: any }) => {
    const [searchText, setSearchText] = useState("");
    const [categoriesData, setCategoriesData] = useState<string[]>();


    // const [productCatalog, setProductCatalog] = useState<TProductCatalog>()

    useEffect(() => {
        const getCategoryData = async () => {
            setCategoriesData(await categories.categoryList.fetchData());
        }
        getCategoryData();
    }, [categories.categoryList.category]);

    const handleClear = () => {
        setSearchText("");
        if (products.searchTimeout) clearTimeout(products.searchTimeout)
        products.productStore.SearchData(null);
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
        if (products.searchTimeout) clearTimeout(products.searchTimeout);
        products.setSearchTimeout(setTimeout(() => products.productStore.SearchData(e.target.value), 400));
    };


    return (
        <div className={"header-elements"}>
            <div className="search-container">
                <input
                    className="search-box"
                    placeholder="Search.."
                    value={searchText}
                    onChange={(e) => handleSearch(e)}
                />
                {products.productStore.search && (
                    <span
                        className="clear-button"
                        onClick={() => handleClear()}
                    >&#10060;
                        </span>
                )}
            </div>

            {/*    <div>*/}
            {/*        <select onChange={(e) => {*/}
            {/*            setSelectedUserDetails({*/}
            {/*                ...selectedUserDetails,*/}
            {/*                id: parseInt(e.target.value),*/}
            {/*                name: e.target.selectedOptions[0].text*/}
            {/*            })*/}
            {/*        }} className="product-category-list">*/}
            {/*            <optgroup label="Select A User">*/}
            {/*                <option hidden>{selectedUserDetails.name || "Users"}</option>*/}
            {/*                {userList.users?.map((user) => (*/}
            {/*                    <option key={user.id} value={user.id}>{`${user.firstName} ${user.lastName}`}</option>*/}
            {/*                ))}*/}
            {/*            </optgroup>*/}
            {/*        </select>*/}
            {/*    </div>*/}
            <div>
                <select onChange={(e) => {
                    if (e.target.value !== 'All') {
                        products.productStore.setSelectedCategory(e.target.value)
                    } else {
                        products.productStore.setSelectedCategory("")
                    }
                }} className="users-list">
                    <optgroup label="Select Category">
                        <option>All</option>
                        {categoriesData?.map((category: string, index: number) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </optgroup>
                </select>
            </div>
            {/*    <div id="custom-product-listing">*/}
            {/*        <Link to="/custom-product">Custom Products</Link>*/}
            {/*    </div>*/}
            {/*    <div id="custom-form">*/}
            {/*        <Link to="/form">Add Custom Product</Link>*/}
            {/*    </div>*/}
            {/*    <div id="cart">*/}
            {/*        <Link to="/cart">{selectedUserDetails.name}</Link>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*</>*/}
        </div>
    );
})
