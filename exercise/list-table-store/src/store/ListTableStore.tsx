import {action, makeObservable, observable} from "mobx";

export class ListTableStore<T> {
    @observable fetchedData: any;
    @observable skip: number=0;
    total: number=0;
    @observable search: string | undefined;

    constructor(promiseData:any) {
        this.fetchedData = promiseData;
        makeObservable(this);
    }

    fetchData(){
        return this.fetchedData(this.skip,this.search);
    }

    @action
    nextPage(){
        console.log(this.total);
       if(this.skip<this.total-10){
           this.skip=this.skip+10;
       }
        console.log(this.skip);
    }

    @action
    prevPage(){
        console.log(this.skip)
        if(this.skip>=10)
        this.skip=this.skip-10;
    }

    @action updateData(data: T){
        this.fetchedData=data;
    }

    @action SearchData(title: string){
        this.search=title;
    }
}