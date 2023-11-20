import {action, makeObservable, observable} from "mobx";

export class FormStore<T> {
    @observable formData: T;

    constructor(initialData: T) {
        this.formData = initialData;
        makeObservable(this);
    }

    getValue(entity: keyof T) {
        return this.formData[entity];
    }

    @action
    updateFormData<K extends keyof T>(entity: K, value: T[K]) {
        this.formData[entity] = value;
    }

}
