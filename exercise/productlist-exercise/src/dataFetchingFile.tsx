import {useEffect, useState} from "react";

export const baseURL = 'https://dummyjson.com';
export enum apiQueries {
    Search = 'search',
    Category = 'category',
    Product = 'product',
    SingleProduct = 'singleProduct',
    UserDetails = 'userDetails',
    Cart = 'cart',
    UserCart = 'userCart',
}


export function createApiUrl(queryType:apiQueries, parameter?: string|number) {
    let url = baseURL;

    switch (queryType) {
        case 'search':
            if (parameter) {
                url += `/products/search?q=${parameter}`;
            }
            break;

        case 'category':
            if (parameter) {
                url += `/products/category/${parameter}`;
            }
            break;

        case 'product':
            url += '/products';
            break;

        case 'singleProduct':
            if (parameter) {
                url += `/products/${parameter}`;
            }
            break;

        case 'userDetails':
            url += '/users/5';
            break;

        case 'cart':
            url += '/carts/19';
            break;

        case 'userCart':
            url += '/users/5/carts';
            break;

        default:
            throw new Error('Invalid action');
    }

    return url;
}

export default function useFetch<Type>(url: string): Type {
    const [fetchResult, setFetchResult] = useState<Type>([] as Type);

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
                setFetchResult({} as Type)
            }

        };
        fetchProductList().then(r => console.log("fetch function called"));
    }, [url]);

    return fetchResult as Type;

}
