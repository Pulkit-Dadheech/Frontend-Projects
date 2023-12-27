import React, {useState} from 'react';
import {ProductStore} from '../store/ProductStore';
import {observer} from 'mobx-react-lite';
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

const product = new ProductStore();
export const TableStoreComponent = observer(() => {
    const [productsList, setProductList] = useState<ProductList>();


    const getData = async () => {
        setProductList(await product.productList.data);
    };
    getData();

    if (!productsList || !productsList.products) {
        return <p>No data available.</p>;
    }

    const handleNext = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
    }

    const handlePrev = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
    }

    return (
        <>
            <CustomTable<Product> allHeaders={["id", "title", "price"]} data={product.productList.data?.products}
                                  handlePrev={handlePrev} handleNext={handleNext}/>
        </>
    );
});
