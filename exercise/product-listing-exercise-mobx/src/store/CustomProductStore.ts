import {action, makeObservable, observable} from "mobx";
import {ListTableStore} from "./ListTableStore";
import {TCustomProduct, TSingleCustomProduct} from "../types/allTypes";
import {SessionStorageSetter} from "../components/SessionStorageHandler/SessionStorageHandler";
export class CustomProductStore {
    customProductStore: ListTableStore<TCustomProduct>;
    @observable customProductId: number=1;
    @observable customProductData: TSingleCustomProduct = {id: 0, title: "", category: "", quantity: 0, description: "", discountPercentage: 0, images: [], price: 0, rating: 4.5, total: 1, customProduct: true};

    constructor() {
        this.customProductStore = new ListTableStore<TCustomProduct>(this.fetchData);
        makeObservable(this);
    }

    fetchData() {
        const data: TCustomProduct = []
        return data;
    }

    @observable setCustomProductData(data: TSingleCustomProduct) {
        this.customProductData = data;
    }

    getCustomProductEntityData(entity: keyof TSingleCustomProduct) {
        return this.customProductData[entity];
    }

    @action
    updateCustomProductSingleEntityData<K extends keyof TSingleCustomProduct>(entity: K, value: TSingleCustomProduct[K]) {
        this.customProductData[entity] = value;
    }

    @action
    updateCustomProductId(id: number){
        this.customProductId=id;
        SessionStorageSetter('customProductId',this.customProductId);
    }

}



