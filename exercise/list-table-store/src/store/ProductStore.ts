import {action, makeObservable, observable} from "mobx";
import {ListTableStore} from "./ListTableStore";
export interface Product {
    id: number;
    title: string;
    price: number;
}

export interface ProductList {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export class ProductStore {
    productList: ListTableStore<ProductList>;
    @observable dataLoading: boolean = true;
    searchTimeout: number=0;

    constructor() {
        this.productList = new ListTableStore<ProductList>(this.fetchData);
        makeObservable(this);
    }

    fetchData=async (skip: number,search?: string,)=> {
        try {
            let response;
            if(search){
                response=await fetch(`https://dummyjson.com/products/search?q=${search}`)
            }
            else{
                response = await fetch(`https://dummyjson.com/products?limit=10&skip=${skip}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error loading data", error);
        }
    }
    @action updateLoading() {
        this.dataLoading = !this.dataLoading;
    }
}


