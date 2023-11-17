import React from "react";
import {observer} from "mobx-react-lite";
import {Button, Form, FormGroup, FormText, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FormStore} from "../store/FormStore";
import {useRouterStore} from "mobx-state-router";

export interface IRegisterFormProps {
    username: string;
    email: string;
    password: string;
}

const registerFormStore = new FormStore<IRegisterFormProps>({
    username: "",
    email: "",
    password: "",
});

export const RegisterForm = observer(() => {
    const routerStore = useRouterStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        registerFormStore.updateFormData(name as keyof IRegisterFormProps, value);
    };
    const handleContactClick = () => {
        routerStore.goTo('contact', {
            params: { id: 'contact' },
        });
    };


    return (
        <div className="Register-Form">
            <h2>Sign In</h2>
            <Form className="form">
                <FormGroup>
                    <Label
                        for="exampleEmail"
                    >Username
                    </Label>
                    <Input
                        type={"text"}
                        name={"username"}
                        placeholder={"Name"}
                        value={registerFormStore.getValue('username')}
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
                        value={registerFormStore.getValue('email')}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label
                        for="examplePassword"
                    >
                        Password
                    </Label>
                    <Input
                        id="examplePassword"
                        type={"password"}
                        name={"password"}
                        placeholder={"Password"}
                        value={registerFormStore.getValue('password')}
                        onChange={handleChange}
                    />
                    <FormText>Your password must be unique.</FormText>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
            <button onClick={handleContactClick}>Go to TodoList</button>
        </div>
    )
});

