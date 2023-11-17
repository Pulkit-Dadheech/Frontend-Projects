import {makeAutoObservable} from "mobx";

export class FormStore<T> {
    formData :T;

    constructor(initialData:T) {
        this.formData = initialData;
        makeAutoObservable(this);
    }

    updateFormData<K extends keyof T>(entity: K, value: T[K]) {
        this.formData[entity] = value;
    }
}