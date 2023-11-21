import React from "react";
import {observer} from "mobx-react-lite";
import {Input} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FormStore} from "../store/FormStore";
import "./ContactForm.css";
import {toJS} from "mobx";
import FormComponent from "./FormComponent";
import FormField from "./FieldComponent";

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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        contactFormStore.updateFormData(name as keyof IContactFormProps, value);
    };

    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        console.log(toJS(contactFormStore.formData));

    }

    function handleReset(e: React.SyntheticEvent) {
        e.preventDefault();
        contactFormStore.resetFormData();
    }

    return (
        <div className="Contact-Form-Container">
            <div className="Contact-Form">
                <h2 className={"text-center font-weight-bolder text-uppercase mb-3"}>Contact-Us</h2>
                <FormComponent<IContactFormProps> formStore={contactFormStore} onSubmit={handleSubmit}
                                                  onReset={handleReset}>

                    <FormField
                        name="name"
                        type={"text"}
                        label="Name"
                        isRequired={true}
                        onChange={handleChange}
                        InputComponent={Input}
                        InputStyleProps="p-3 rounded-pill"
                    />
                    <FormField
                        name="email"
                        type={"email"}
                        label="Email"
                        isRequired={true}
                        onChange={handleChange}
                        InputComponent={Input}
                        InputStyleProps="p-3 rounded-pill"
                    />
                    <FormField
                        name="message"
                        type={"textarea"}
                        label="Message"
                        isRequired={true}
                        onChange={handleChange}
                        InputComponent={Input}
                        InputStyleProps="mb-4 rounded p-2"
                    />
                </FormComponent>
            </div>
        </div>
    )
});
