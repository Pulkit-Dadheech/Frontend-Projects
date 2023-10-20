import './productlist.css'
import useFetch, {apiQueries, baseURL, createApiUrl} from "./dataFetchingFile";
import {ProductCatalog, UserData} from "./dataTypes";

export function useProductList(search?: string, category?: string,skippedProducts?: number,limit? : number) {
    let url: string;

    if (search) {
        url = createApiUrl(apiQueries.Search, search);
    } else if (category) {
        url = createApiUrl(apiQueries.Category, category,limit,skippedProducts);
    } else {
        url = createApiUrl(apiQueries.Product,"",limit,skippedProducts);
    }
    const {data, error,loading} = useFetch<ProductCatalog>(url);
    let filteredData;

    if (search && category) {
        const newData = data?.products.filter((product) => product.category === category)
        if (newData) {
            filteredData = {
                products: newData,
                total: data?.total,
                skip: data?.skip,
                limit: data?.limit,
            } as ProductCatalog
            return {productCatalog: filteredData, productError:error,loading}
        }
    }


    return {productCatalog:data, productError: error,loading};

}

export function useCategoryList() {
    const url = `${baseURL}/products/categories`;
    const {data,error}= useFetch<string[]>(url);
    return {categoryList: data,categoryError :error};
}


export function useGetUserDetails() {

    const {data,error}=useFetch<UserData>(createApiUrl(apiQueries.UserDetails));
    return {userDetails: data, userDataError: error}
}