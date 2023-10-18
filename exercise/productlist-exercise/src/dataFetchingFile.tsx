import {useCallback, useEffect, useState} from "react";

export const baseURL = 'https://dummyjson.com';

export enum apiQueries {
    Search = 'search',
    Category = 'category',
    Product = 'product',
    SingleProduct = 'singleProduct',
    UserDetails = 'userDetails',
    AddToCart = 'addToCart',
    UserCart = 'userCart',
}


export function createApiUrl(queryType: apiQueries, parameter?: string | number) {
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

        case 'addToCart':
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


export default function useFetch<Type>(url: string): { data: Type | null, error: string | null,loading:boolean } {
    const [data, setData] = useState<Type | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(url);
            const responseData = await response.json();
            setData(responseData);
            setError(null);
        } catch (error) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {data, error,loading};
}

