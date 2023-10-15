import {useEffect, useMemo, useState} from 'react';
import './productlist.css'
import useFetch, {baseURL, fetchCategory, fetchProduct, fetchSearch, getUserDetails} from "./dataFetchingFile";

export type Product = {
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
export type cartProduct = {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedPrice: number;
};
export type carts = {
    id:number,
    products: cartProduct[]
    total: number,
    "discountedTotal": number,
    "userId": number, // user id is 5
    "totalProducts": number,
    "totalQuantity": number
}
export type UserCart = {
    carts: carts[]
    total: number
    skip: number
    limit: number
}

export function useProductList(search?: string, category?: string) {
    const [productCatalog, setProductCatalog] = useState<ProductCatalog | undefined>({
        products: [],
        total: 0,
        skip: 0,
        limit: 30,
    });

    let url: string;

    if (search) {
        url = fetchSearch(search);
    } else if (category) {
        url = fetchCategory(category);
    } else {
        url = fetchProduct();
    }
    const data = useFetch<ProductCatalog>(url);


    useEffect(() => {
        setProductCatalog(data);
    }, [data]);
    return useMemo(() => productCatalog, [productCatalog]);

}

export function useCategoryList() {
    const [category, setCategory] = useState<string[] | undefined>([]);
    const url = `${baseURL}/products/categories`;
    const data = useFetch<string[]>(url);

    useEffect(() => {
        setCategory(data);
    }, [data]);

    return useMemo(() => category, [category]);
}

export function useGetUserCart() {
    const url = `${baseURL}/users/5/carts`;
    return useFetch<UserCart>(url);
}

interface UserData {
    firstName: string;
    lastName: string;

}

export function useGetUserDetails() {
    return useFetch<UserData>(getUserDetails());
}