import React, {useEffect, useState} from 'react';
import {ProductStore} from '../store/ProductStore';
import {observer} from 'mobx-react-lite';
import {Post, PostsList, PostStore} from "../store/PostStore";
import {CustomTable} from "./CustomTable";

export interface Product {
    id: number;
    title: string;
    price: number;
}

export interface ProductList {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

const posts = new PostStore();
const product = new ProductStore();

export const TableStoreComponent = observer(() => {
    const [productData, setProductData] = useState<ProductList>();
    const [postData, setPostData] = useState<PostsList>();

    useEffect(() => {
        const getProductData = async () => {
            const productData = await product.productList.fetchData()
            setProductData(productData);
            product.productList.total = productData.total;
        };
        getProductData();
    }, [product.productList.skip, product.productList.search]);

    useEffect(() => {
        const getPostData = async () => {
            const postData = await posts.postList.fetchData();
            setPostData(postData);
            posts.postList.total = postData.total;
        };
        getPostData();
    }, [posts.postList.skip, posts.postList.search]);

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
                data={productData?.products}
                handlePrev={handlePrev}
                handleNext={handleNext}
                handleSearch={handleSearch}
            />
            <h2 className={"text-center text-bg-dark p-2"}>Posts</h2>
            <CustomTable<Post>
                store={posts.postList}
                allHeaders={["title", "body"]}
                data={postData?.posts}
                handlePrev={handlePrev}
                handleNext={handleNext}
                handleSearch={handleSearch}
            />
        </>
    );
});
