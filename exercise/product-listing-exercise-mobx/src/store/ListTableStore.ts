import {action, makeObservable, observable} from "mobx";

export class ListTableStore<T> {
    @observable fetchedData: any;
    @observable skip: number=0;
    @observable total: number=0;
    limit: number=5;
    @observable search: string | null = null;
    @observable category: string = "";

    constructor(promiseData:any) {
        this.fetchedData = promiseData;
        makeObservable(this);
    }

    fetchData(){
        return this.fetchedData(this.skip,this.category,this.limit,this.search);
    }

    @action
    nextPage(){
        console.log(this.total);
        if(this.skip<this.total-this.limit){
            this.skip=this.skip+this.limit;
        }
        console.log(this.skip);
    }

    @action
    prevPage(){
        console.log(this.skip)
        if(this.skip>=this.limit)
            this.skip=this.skip-this.limit;
    }

    @action updateData(data: T){
        this.fetchedData=data;
    }

    @action SearchData(title: string){
        this.search=title;
    }

    @action setSelectedCategory(category: string){
        this.category=category;
    }
    @action resetSkip(){
        this.skip=0;
    }

    @action updateTotal(newTotal: number){
        this.total=newTotal;
    }
}
