import React from "react";
import {observer} from "mobx-react-lite";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FormStore} from "../store/FormStore";
import "./ContactForm.css";
import {toJS} from "mobx";
import FormWrapper from "./FormWrapper";
import FormField, {TRenderProps} from "./FormField";
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

    function handleSubmit<T>(formData: T) {
        console.log(toJS(formData));
    }

    function handleReset(e: React.SyntheticEvent) {
        e.preventDefault();
        contactFormStore.resetFormData();
    }

    interface FormFieldRendererProps {
        fieldProps: TRenderProps;
    }


    return (
        <div className="Contact-Form-Container">
            <div className="Contact-Form">
                <h2 className={"text-center font-weight-bolder text-uppercase mb-3"}>Contact-Us</h2>
                <FormWrapper<IContactFormProps>
                    formStore={contactFormStore}
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                >
                    <FormField
                        name={"name"}
                        label="Name"
                        isRequired={true}
                        render={({fieldProps}) => (
                            <CustomInput
                                type="text"
                                className="p-3 rounded-pill"
                                {...fieldProps}
                            />
                        )}
                    />
                    <FormField
                        name={"email"}
                        label={"Email"}
                        isRequired={true}
                        render={({fieldProps}) => (
                            <CustomInput
                                type="email"
                                className="p-3 rounded-pill"
                                {...fieldProps}
                            />
                        )}
                    />
                    <FormField
                        name={"message"}
                        label={"Message"}
                        isRequired={true}
                        render={({fieldProps}) => (
                            <CustomInput
                                type="textarea"
                                className="p-3 rounded-pill"
                                {...fieldProps}
                            />
                        )}
                    />
                </FormWrapper>
            </div>
        </div>
    )
});
