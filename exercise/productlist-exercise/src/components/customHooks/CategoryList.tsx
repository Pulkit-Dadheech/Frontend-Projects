import useFetch, {baseURL} from "../../dataFetchingFile";

export function useCategoryList() {
    const url = `${baseURL}/products/categories`;
    const {data, error} = useFetch<string[]>(url);
    return {categoryList: data, categoryError: error};
}