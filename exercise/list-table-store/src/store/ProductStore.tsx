import {action, makeObservable, observable} from "mobx";
import {ListTableStore} from "./ListTableStore";

interface Product {
    id: number;
    title: string;
    price: number;
}

interface ProductList {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export class ProductStore {
    productList: ListTableStore<ProductList>;
    @observable dataLoading: boolean = true;

    constructor() {
        this.productList = new ListTableStore<ProductList>(this.fetchData());
        makeObservable(this);
    }

    @action async fetch(){
        const fetchedData=this.fetchData();
        this.productList.data=await fetchedData;
    }
    async fetchData() {
        try {
            const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${this.skip}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error loading data", error);
            throw error;
        }
    }

    @action updateLoading(){
        this.dataLoading=!this.dataLoading;
    }
    // @action
    // addProduct(product: Product) {
    //     this.productList.products.push(product);
    // }
    //
    // @action
    // removeProduct(productName?: string, productId?: number) {
    //     if (productName) {
    //         this.productList.products = this.productList.products.filter((singleProduct: any) => singleProduct.title === productName);
    //     }
    //     if (productId) {
    //         this.productList.products = this.productList.products.filter((singleProduct: any) => singleProduct.id === productId);
    //     }
    // }
}



