import React, {ReactNode, SyntheticEvent} from 'react';
import {FormContext} from './FormContext';
import {FormStore} from "../store/FormStore";

interface IFormComponentProps<T> {
    formStore: FormStore<T>;
    onSubmit: (e: SyntheticEvent<Element, Event>) => void;
    onReset: (e: SyntheticEvent<Element, Event>) => void;
    children: ReactNode;
}

function FormComponent<T>({formStore, onSubmit, onReset, children}: IFormComponentProps<T>) {
    return (
        <FormContext.Provider value={{formStore}}>
            <form onSubmit={(e) => onSubmit(e)}>
                {children}
                <button
                    className="d-block w-25 rounded-pill btn-outline-primary p-2 mt-1 rounded float-left"
                    type="submit"
                >
                    Submit
                </button>
                <button
                    className="btn-outline-danger p-2 rounded-pill w-25 p-2 mt-1 float-right"
                    type="button"
                    onClick={onReset}
                >
                    Reset
                </button>
            </form>
        </FormContext.Provider>
    );
};

export default FormComponent;
