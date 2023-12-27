import {action, makeObservable, observable} from "mobx";

export class ListTableStore<T> {
    @observable data: T;
    @observable skip: number=0;
    total: number=0;

    constructor(promiseData: T) {
        this.data = promiseData;
        makeObservable(this);
    }

    getData() {
        return this.data;
    }

    nextPage(){
       if(this.skip<this.total-10){
           this.skip=this.skip+10;
       }
       console.log(this.skip,this.total);
    }

    prevPage(){
        if(this.skip>=10)
        this.skip=this.skip-10;
    }

    @action updateData(data: T){
        this.data=data;
    }
}