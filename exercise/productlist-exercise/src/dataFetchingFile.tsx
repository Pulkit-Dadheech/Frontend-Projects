import {useCallback, useEffect, useState} from "react";

export const baseURL = 'https://dummyjson.com';

export enum apiQueries {
    Search = 'search',
    Category = 'category',
    Product = 'product',
    SingleProduct = 'singleProduct',
    AddToCart = 'addToCart',
    UserCart = 'userCart',
    User ='users'
}

export function createApiUrl(queryType: apiQueries, parameter?: string | number, limit?: number, skip?: number) {
    let url = baseURL;

    switch (queryType) {
        case 'search':
            if (parameter) {
                url += `/products/search?q=${parameter}&limit=${limit}&skip=${skip}`;
            }
            break;

        case 'category':
            if (parameter) {
                url += `/products/category/${parameter}?limit=${limit}&skip=${skip}`;
            }
            break;

        case 'product':
            url += `/products?limit=${limit}&skip=${skip}`;
            break;

        case 'singleProduct':
            if (parameter) {
                url += `/products/${parameter}`;
            }
            break;

        case 'users':
            url += '/users?limit=100&select=firstName,lastName';
            break;

        case 'addToCart':
            url += `/carts/${parameter}`;
            break;

        case 'userCart':
            url += '/users/5/carts';
            break;

        default:
            throw new Error('Invalid action');
    }

    return url;
}

export default function useFetch<Type>(url: string): { data: Type | null, error: string | null, loading: boolean } {
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

    return {data, error, loading};
}

