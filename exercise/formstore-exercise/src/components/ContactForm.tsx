import React from "react";
import {observer} from "mobx-react-lite";
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FormStore} from "../store/FormStore";

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


    return (
        <div className="Register-Form">
            <h2>Contact-Us</h2>
            <Form className="form">
                <FormGroup>
                    <Label
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
                        for="examplePassword"
                    >
                        Message
                    </Label>
                    <Input
                        id="examplePassword"
                        type={"textarea"}
                        name={"message"}
                        placeholder={"Message"}
                        value={contactFormStore.getValue('message')}
                        onChange={handleChange}
                    />

                </FormGroup>
                <Button>Submit</Button>
            </Form>

        </div>
    )
});
