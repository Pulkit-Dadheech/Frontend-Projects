import {action, makeObservable, observable} from "mobx";

export class ListTableStore<T> {
    @observable fetchedData: any;
    @observable data: any;
    @observable skip: number=10;
    total: number=0;
    @observable search: string | undefined;

    constructor(promiseData:any) {
        this.fetchedData = promiseData;
        makeObservable(this);
    }

   async fetchData(){
       const result = await this.fetchedData(this.skip,this.search);
       this.setData(result)
    }
    @action
    setData(result: any){
        this.total=result.total;
        this.data=result;
    }

    @action
    nextPage(){
        console.log(this.total);
       if(this.skip<this.total-10){
           this.skip=this.skip+10;
       }
        this.fetchData()
        console.log(this.skip);
    }

    @action
    prevPage(){
        console.log(this.skip)
        if(this.skip>=10)
        this.skip=this.skip-10;
        this.fetchData()
    }

    @action updateData(data: T){
        this.fetchedData=data;
    }

    @action SearchData(title: string){
        this.search=title;
        this.fetchData();
    }
}