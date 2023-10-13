import {useEffect, useState} from "react";
import {ProductCatalog} from "./customHooks";
import exp from "constants";


export const baseURL = 'https://dummyjson.com';
export const fetchSearch = (search: string) => {
    return `${baseURL}/products/search?q=${search}`;
}
export const fetchCategory = (category: string) => {
    return `${baseURL}/products/category/${category}`;

}
export const fetchProduct = () => {
    return `${baseURL}/products`;
}
export function getUrlForSingleProduct(id: number) {
    return `${baseURL}/products/${id}`;
}
export function getUserDetails(){
    return `${baseURL}/users/2`;
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
