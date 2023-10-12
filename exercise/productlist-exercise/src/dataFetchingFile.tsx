import {useEffect, useState} from "react";
import {ProductCatalog} from "./useProductList";


export const baseURL = 'https://dummyjson.com/products';
export const fetchSearch = (search: string) => {
    return `${baseURL}/search?q=${search}`;
}
export const fetchCategory = (category: string) => {
    return `${baseURL}/category/${category}`;

}
export const fetchProduct = () => {
    return `${baseURL}`;

}
export default function useFetch<Type>(url: string):Type | undefined {
    const [fetchResult, setFetchResult] = useState<Type>();

    useEffect(() => {


        const fetchProductList = async () => {
            try {
                const response: Response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    setFetchResult(data);
                } else {
                    throw new Error('Failed to fetch product data');
                }
            } catch (error) {
                console.error(error);
            }

        };
        fetchProductList().then(r => console.log("fetch function called"));
    }, [url]);

    return fetchResult;

}
