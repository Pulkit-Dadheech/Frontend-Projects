import {action, computed, makeObservable, observable} from "mobx";

export class FormStore<T> {
    formData: T;

    constructor(initialData: T) {
        this.formData = initialData;
        makeObservable(this, {
            formData: observable,
            // getValue: computed,
            updateFormData: action,
        });
    }

    getValue(entity: keyof T) {
        return this.formData[entity]
    }

    updateFormData<K extends keyof T>(entity: K, value: T[K]) {
        this.formData[entity] = value;
    }
}