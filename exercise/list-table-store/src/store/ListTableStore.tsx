import {action, makeObservable, observable} from "mobx";

export class ListTableStore<T> {
    @observable data: T;
    @observable skip: number=0;
    total: number=0;
    @observable title: string="";

    constructor(promiseData: T) {
        this.data = promiseData;
        makeObservable(this);
    }

    getData() {
        return this.data;
    }

    @action
    nextPage(){
       if(this.skip<this.total-10){
           this.skip=this.skip+10;
       }
    }

    @action
    prevPage(){
        if(this.skip>=10)
        this.skip=this.skip-10;
    }

    @action updateData(data: T){
        this.data=data;
    }

    @action SearchData(title: string){
        this.title=title;
    }
}