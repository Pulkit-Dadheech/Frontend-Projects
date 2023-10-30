import useFetch, {apiQueries, createApiUrl} from "../../dataFetchingFile";
import {TProductCatalog} from "../../dataTypes";

export function useProductList(search?: string, category?: string, skippedProducts?: number, limit?: number) {
    let url: string;

    if (search) {
        url = createApiUrl(apiQueries.Search, search, limit, skippedProducts);
    } else if (category) {
        url = createApiUrl(apiQueries.Category, category, limit, skippedProducts);
    } else {
        url = createApiUrl(apiQueries.Product, "", limit, skippedProducts);
    }
    const {data, error, loading} = useFetch<TProductCatalog>(url);
    let filteredData;

    if (search && category) {
        const newData = data?.products.filter((product) => product.category === category)
        if (newData) {
            filteredData = {
                products: newData,
                total: newData.length,
                skip: data?.skip,
                limit: data?.limit,
            } as TProductCatalog
            return {productCatalog: filteredData, productError: error, loading}
        }
    }


    return {productCatalog: data, productError: error, loading};

}
