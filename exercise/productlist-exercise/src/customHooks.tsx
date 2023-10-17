import './productlist.css'
import useFetch, {apiQueries, baseURL, createApiUrl} from "./dataFetchingFile";
import {ProductCatalog, UserData} from "./dataTypes";

export function useProductList(search?: string, category?: string) {
    let url: string;

    if (search) {
        url = createApiUrl(apiQueries.Search, search);
    } else if (category) {
        url = createApiUrl(apiQueries.Category, category);
    } else {
        url = createApiUrl(apiQueries.Product);
    }
    let data = useFetch<ProductCatalog>(url);

    if (search && category) {
        const newData = data.products.filter((product) => product.category === category)
        if (newData) {
            return {
                products: newData,
                total: data.total,
                skip: data.skip,
                limit: data.limit,

            }
        }
    }

    return data;

}

export function useCategoryList() {
    const url = `${baseURL}/products/categories`;
    return useFetch<string[]>(url);
}


export function useGetUserDetails() {
    return useFetch<UserData>(createApiUrl(apiQueries.UserDetails));
}