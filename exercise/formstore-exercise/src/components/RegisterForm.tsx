import React from "react";
import {observer} from "mobx-react-lite";
import {Button, Form, FormGroup, FormText, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FormStore} from "../store/FormStore";
import {useRouterStore} from "mobx-state-router";
import "./RegisterForm.css";
import {toJS} from "mobx";


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
            params: {id: 'contact'},
        });
    };

    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        console.log(toJS(registerFormStore.formData));
    }

    function handleReset(e: React.SyntheticEvent) {
        e.preventDefault();
        registerFormStore.resetFormData();
    }

    return (
        <div className={"Register-Form-Container"}>
            <div className={"Register-Form"}>
                <div className=" left-column text-center d-flex flex-column bg-white p-4">
                    <Form className="register-form-content p-4 mt-3 mb-5" onSubmit={(e) => handleSubmit(e)}>
                        <h2 className={"text-uppercase font-weight-bolder text-center mb-3"}>Sign In</h2>
                        <FormGroup className="mt-4 mb-4">
                            <Label className="font-weight-bold"
                                   for="exampleEmail"
                            >Username
                            </Label>
                            <Input
                                className={"p-3 rounded-pill"}
                                type={"text"}
                                name={"username"}
                                placeholder={"Name"}
                                value={registerFormStore.getValue('username')}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup className="my-4">
                            <Label className="font-weight-bold"
                                   for="exampleEmail"
                            >
                                Email
                            </Label>
                            <Input
                                className={"p-3 rounded-pill"}
                                id="exampleEmail"
                                type={"email"}
                                name={"email"}
                                placeholder={"Email"}
                                value={registerFormStore.getValue('email')}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup className="my-4">
                            <Label className="font-weight-bold"
                                   for="examplePassword"
                            >
                                Password
                            </Label>
                            <Input
                                className="p-3 rounded-pill"
                                id="examplePassword"
                                type={"password"}
                                name={"password"}
                                placeholder={"Password"}
                                value={registerFormStore.getValue('password')}
                                onChange={handleChange}
                            />
                            <FormText>Your password must be unique.</FormText>
                        </FormGroup>
                        <button
                            className="d-block w-25 rounded-pill btn-outline-primary p-2 mt-1 rounded float-left"
                            type={"submit"}
                        >Submit
                        </button>
                        <button
                            className={"btn-outline-danger p-2 rounded-pill w-25 p-2 mt-1 float-right"}
                            type="button"
                            onClick={handleReset}
                        >Reset
                        </button>
                        <Button
                            onClick={handleContactClick}
                            className="bg-primary fixed-bottom"
                        >Go to ContactForm
                        </Button>
                    </Form>
                </div>
                <div className="right-column">
                    <img
                        src={require("../img/SignIn.jpg")}
                        alt="Sign In"
                        width="100%"
                        height="auto"/>
                </div>
            </div>
        </div>
    )
});
