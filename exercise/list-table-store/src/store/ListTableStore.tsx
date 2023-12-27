import {makeObservable, observable} from "mobx";

export class ListTableStore<T> {
    @observable data: T | undefined;

    constructor(promiseData: any) {
        this.data = promiseData;
        makeObservable(this);
    }
}