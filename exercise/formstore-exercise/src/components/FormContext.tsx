import React, {createContext, ReactNode, useContext} from 'react';
import {FormStore} from "../store/FormStore";

export interface IFormContext<T> {
    formStore: T;
}

const FormContext = createContext<IFormContext<any> | undefined>(undefined);

export const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};

export function FormProvider<T>({formStore, children}: { formStore: FormStore<T>, children: ReactNode }) {
    return <FormContext.Provider value={{formStore}}>{children}</FormContext.Provider>;
};
