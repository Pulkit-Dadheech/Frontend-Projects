import {action, makeObservable, observable} from "mobx";

export class FormStore<T> {
    formData :T;

    constructor(initialData:T) {
        this.formData = initialData;
        makeObservable(this,{
            formData: observable,
            updateFormData: action,
        });
    }

    updateFormData<K extends keyof T>(entity: K, value: T[K]) {
        this.formData[entity] = value;
    }
}