import React, {useEffect} from 'react';
import {Product, ProductStore} from '../store/ProductStore';
import {observer} from 'mobx-react-lite';
import {Post, PostStore} from "../store/PostStore";
import {CustomTable} from "./CustomTable";
import {toJS} from "mobx";

const posts = new PostStore();
const product = new ProductStore();

export const TableStoreComponent = observer(() => {

    useEffect(() => {
        const getProductData = async () => {
            await product.productList.fetchData()
            console.log(toJS(product.productList.data));
        };
        getProductData();
    }, []);

    useEffect(() => {
        const getPostData = async () => {
            await posts.postList.fetchData();
        };
        getPostData();
    }, []);

    const handleNext = (e: React.MouseEvent<HTMLElement>, store: any) => {
        e.preventDefault();
        store.nextPage();
    }

    const handlePrev = (e: React.MouseEvent<HTMLElement>, store: any) => {
        e.preventDefault();
        store.prevPage();
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>, store: any) => {
        clearTimeout(store.searchTimeout);
        store.searchTimeout = setTimeout(() => store.SearchData(e.target.value), 500);
    }

    return (
        <>
            <h2 className={"text-center text-bg-dark p-2"}>Products</h2>
            <CustomTable<Product>
                store={product.productList}
                allHeaders={["title", "price"]}
                data={product.productList.data?.products}
                handlePrev={handlePrev}
                handleNext={handleNext}
                handleSearch={handleSearch}
            />
            <h2 className={"text-center text-bg-dark p-2"}>Posts</h2>
            <CustomTable<Post>
                store={posts.postList}
                allHeaders={["title", "body"]}
                data={posts.postList.data?.posts}
                handlePrev={handlePrev}
                handleNext={handleNext}
                handleSearch={handleSearch}
            />
        </>
    );
});
