import {makeAutoObservable} from "mobx";

class FormStore{
    contactFormData={
        name:"",
        email: "",
        message: "",
    };
    registerFormData={
        username:"",
        email:"",
        password:"",
    }

    constructor() {
        makeAutoObservable(this);
    }

    updateFormData(formName:string,entity:string,value:string){
        this[`${formName}FormData`][entity]=value;
    }
}
const formStore=new FormStore();
export default formStore;