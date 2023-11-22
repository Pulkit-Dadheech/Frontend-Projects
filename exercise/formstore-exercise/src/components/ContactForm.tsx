import React from "react";
import {observer} from "mobx-react-lite";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FormStore} from "../store/FormStore";
import "./ContactForm.css";
import {toJS} from "mobx";
import FormComponent from "./FormComponent";
import FormField from "./FieldComponent";
import {CustomInput} from "./InputComponent";

export interface IContactFormProps {
    name: string;
    email: string;
    message: string;
}

const contactFormStore = new FormStore<IContactFormProps>({
    name: "",
    email: "",
    message: "",
});

export const ContactForm = observer(() => {

    function handleSubmit<T>(formStore:FormStore<T>) {
        console.log(toJS(formStore.formData));
    }

    function handleReset(e: React.SyntheticEvent) {
        e.preventDefault();
        contactFormStore.resetFormData();
    }

    return (
        <div className="Contact-Form-Container">
            <div className="Contact-Form">
                <h2 className={"text-center font-weight-bolder text-uppercase mb-3"}>Contact-Us</h2>
                <FormComponent<IContactFormProps>
                    formStore={contactFormStore}
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                >
                    <FormField
                        name="name"
                        type={"text"}
                        label="Name"
                        isRequired={true}
                        InputComponent={CustomInput}
                        InputStyleProps="p-3 rounded-pill"
                    />
                    <FormField
                        name="email"
                        type={"email"}
                        label="Email"
                        isRequired={true}
                        InputComponent={CustomInput}
                        InputStyleProps="p-3 rounded-pill"
                    />
                    <FormField
                        name="message"
                        type={"textarea"}
                        label="Message"
                        isRequired={true}
                        InputComponent={CustomInput}
                        InputStyleProps="mb-4 rounded-pill p-2"
                    />
                </FormComponent>
            </div>
        </div>
    )
});
