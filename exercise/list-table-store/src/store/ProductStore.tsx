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
        this.productList = new ListTableStore<ProductList>({products: [], total: 0, skip: 0, limit: 0});
        this.fetch();
        makeObservable(this);
    }

    @action
    async fetch() {
        const fetchedData = this.fetchData();
        this.productList.updateData(await fetchedData);
    }

    async fetchData() {
        try {
            const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${this.productList.skip}`);
            const data = await response.json();
            this.productList.total = data.total;
            return data;
        } catch (error) {
            console.error("Error loading data", error);
            throw error;
        }
    }

    @action nextPage() {
        this.productList.nextPage();
        this.fetch();
    }

    @action prevPage() {
        this.productList.prevPage();
        this.fetch();
    }

    @action updateLoading() {
        this.dataLoading = !this.dataLoading;
    }
}



