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

    if (search) {
        url = fetchSearch(search);
    } else if (category) {
        url = fetchCategory(category);
    } else {
        url = fetchProduct();
    }
    let data = useFetch<ProductCatalog>(url);


    useEffect(() => {
        setProductCatalog(data);
    }, [data]);
    return useMemo(() => productCatalog, [productCatalog]);

}

export function useCategoryList() {
    const [category, setCategory] = useState<string[] | undefined>([]);
    const url = `https://dummyjson.com/products/categories`;
    let data = useFetch<string[]>(url);

    useEffect(() => {
        setCategory(data);
    }, [data]);

    return useMemo(() => category, [category]);
}

interface UserData {
    firstName: string;
    lastName: string;
    // Add other properties if needed
}

export function useUserList() {
    const [username, setUsername] = useState<String | undefined>("");
    const url = `https://dummyjson.com/users/2`;
    let data = useFetch<UserData>(url);

    useEffect(() => {
        setUsername(`${data?.firstName}`+`${data?.lastName}`);
    }, [data]);
    console.log(username)
    return useMemo(() => username, [username]);
}



// return productElements;

