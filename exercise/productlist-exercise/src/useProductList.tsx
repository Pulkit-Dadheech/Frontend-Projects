import {useEffect, useMemo, useState} from 'react';
import './productlist.css'
import useFetch, {fetchCategory, fetchProduct, fetchSearch} from "./dataFetchingFile";

type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
};

export type ProductCatalog = {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
};

export function useProductList(search?: string, category?: string) {
    const [productCatalog, setProductCatalog] = useState<ProductCatalog | undefined>({
        products: [],
        total: 0,
        skip: 0,
        limit: 30,
    });

    let url: string;


    url = fetchProduct();
    if (search) {
        url = fetchSearch(search);
    } else if (category) {
        url = fetchCategory(category);
    }
    let data = useFetch<ProductCatalog>(url);


    useEffect(() => {
        setProductCatalog(data);
    }, [data]);


    // useEffect(() => {
    //
    //
    //     const fetchProductList = async () => {
    //         try {
    //             const response: Response = await productList();
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setProductCatalog(data);
    //             } else {
    //                 throw new Error('Failed to fetch product data');
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }
    //
    //     };
    //     fetchProductList();
    // }, [search,category]);
    return useMemo(() => productCatalog, [productCatalog]);
    // return productCatalog;

}

export function useCategoryList() {
    const [category, setCategory] = useState<string[] | undefined>([]);
    const url=`https://dummyjson.com/products/categories`;
    let data = useFetch<string[]>(url);

    useEffect(() => {
        setCategory(data);
    }, [data]);

    return useMemo(() => category, [category]);
}


// return productElements;

