    import React, {ReactNode, SyntheticEvent, useEffect} from 'react';
    import {FormContext} from './FormContext';
    import {FormStore} from "../store/FormStore";

    interface IFormComponentProps<T> {
        formStore: FormStore<T>;
        onSubmit: (formData:T) => void;
        onReset: (e: SyntheticEvent) => void;
        children: ReactNode;
    }

    function FormWrapper<T>({formStore, onSubmit, onReset, children}: IFormComponentProps<T>) {

        useEffect(() => {
            formStore.resetFormData();
        }, []);

        const handleSubmit = (e: React.SyntheticEvent) => {
            e.preventDefault();
            onSubmit(formStore.formData);
        };
        const handleReset = (e: React.SyntheticEvent) => {
            formStore.resetFormData();
            onReset(e);
        };

        return (
            <FormContext.Provider value={{ formStore }}>
                <form onSubmit={(e) => handleSubmit(e)}>
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
                        onClick={(e) => handleReset(e)}
                    >
                        Reset
                    </button>
                </form>
            </FormContext.Provider>
        );
    }

    export default FormWrapper;
