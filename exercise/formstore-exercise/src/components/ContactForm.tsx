import React from "react";
import {observer} from "mobx-react-lite";
import {Form, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FormStore} from "../store/FormStore";
import "./ContactForm.css";
import {toJS} from "mobx";

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
    function handleReset(e:React.SyntheticEvent){
        e.preventDefault();
        contactFormStore.resetFormData();
    }

    return (
        <div className="Contact-Form-Container">
            <div className="Contact-Form">
                <h2 className={"text-center font-weight-bolder text-uppercase mb-3"}>Contact-Us</h2>
                <Form className="form" onSubmit={(e) => handleSubmit(e)}>
                    <FormGroup>
                        <Label
                            className={"font-weight-bolder text-uppercase"}
                            for="exampleName"
                        >Name
                        </Label>
                        <Input
                            type={"text"}
                            name={"name"}
                            placeholder={"Name"}
                            value={contactFormStore.getValue('name')}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label
                            className={"font-weight-bold text-uppercase"}
                            for="exampleEmail"
                        >
                            Email
                        </Label>
                        <Input

                            id="exampleEmail"
                            type={"email"}
                            name={"email"}
                            placeholder={"Email"}
                            value={contactFormStore.getValue('email')}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label
                            className={"font-weight-bold text-uppercase"}
                            for="examplePassword"
                        >
                            Message
                        </Label>
                        <Input
                            className={"mb-4 rounded p-2"}
                            id="examplePassword"
                            type={"textarea"}
                            name={"message"}
                            placeholder={"Message"}
                            value={contactFormStore.getValue('message')}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <button
                        className={"btn-outline-primary p-2 rounded-pill w-25 mt-3 float-left"}
                        type="submit"
                    >Submit
                    </button>
                    <button
                        className={"btn-outline-danger p-2 rounded-pill w-25 mt-3 float-right"}
                        type="button"
                        onClick={handleReset}
                    >Reset
                    </button>
                </Form>

            </div>
        </div>
    )
});
