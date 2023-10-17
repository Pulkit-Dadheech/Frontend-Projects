import {useEffect, useMemo, useState} from 'react';
import './productlist.css'
import useFetch, {baseURL, fetchCategory, fetchProduct, fetchSearch, getUserDetails} from "./dataFetchingFile";
import {ProductCatalog,UserData} from "./dataTypes";
export function useProductList(search?: string, category?: string) {
    const [productCatalog, setProductCatalog] = useState<ProductCatalog>({
        products: [],
        total: 0,
        skip: 0,
        limit: 30,
    }as ProductCatalog);

    let url: string;

    if (search) {
        url = fetchSearch(search);
    } else if (category) {
        url = fetchCategory(category);
    } else {
        url = fetchProduct();
    }
    let data: ProductCatalog;
    data = useFetch<ProductCatalog>(url);

    if (search && category) {
        const newData = data.products.filter((product) => product.category === category)
        if (data && newData) {
            data = {
                products: newData,
                total: data.total,
                skip: data.skip,
                limit: data.limit,

            }
        }
    }


    useEffect(() => {
        setProductCatalog(data);
    }, [data]);
    return useMemo(() => productCatalog, [productCatalog]);

}

export function useCategoryList() {
    const [category, setCategory] = useState<string[]>([] as string[]);
    const url = `${baseURL}/products/categories`;
    const data = useFetch<string[]>(url);

    useEffect(() => {
        setCategory(data);
    }, [data]);

    return useMemo(() => category, [category]);
}


export function useGetUserDetails() {
    return useFetch<UserData>(getUserDetails());
}