import React from 'react';
import {ProductStore} from '../store/ProductStore';
import {observer} from 'mobx-react-lite';
import {Post, PostStore} from "../store/PostStore";
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
        const x = setTimeout(() => store.search(e.target.value), 500);
        store.searchTimeout = x;
    }

    return (
        <>
            <CustomTable<Product>
                store={product}
                allHeaders={["id", "title", "price"]}
                data={product.productList.data?.products}
                handlePrev={handlePrev}
                handleNext={handleNext}
                handleSearch={handleSearch}
            />
            <CustomTable<Post>
                store={posts}
                allHeaders={["id", "title", "body"]}
                data={posts.postList.data?.posts}
                handlePrev={handlePrev}
                handleNext={handleNext}
                handleSearch={handleSearch}
            />
        </>
    );
});
