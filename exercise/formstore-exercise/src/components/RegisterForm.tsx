import React from "react";
import {observer} from "mobx-react-lite";
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FormStore} from "../store/FormStore";
import {useRouterStore} from "mobx-state-router";
import "./RegisterForm.css";
import {toJS} from "mobx";
import FormField from "./FieldComponent";
import FormComponent from "./FormComponent";
import {CustomInput} from "./InputComponent";


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
                    <FormComponent<IRegisterFormProps>
                        formStore={registerFormStore}
                        onSubmit={handleSubmit}
                        onReset={handleReset}
                    >
                        <div className="register-form-content p-4 mt-3 mb-5">
                            <h2 className="text-uppercase font-weight-bolder text-center mb-3">Sign In</h2>

                            <FormField
                                name="username"
                                type={"text"}
                                label="Username"
                                isRequired={true}
                                onChange={handleChange}
                                InputComponent={CustomInput}
                                InputStyleProps="p-3 rounded-pill"
                            />

                            <FormField
                                name="email"
                                type={"email"}
                                label="Email"
                                isRequired={true}
                                onChange={handleChange}
                                InputComponent={CustomInput}
                                InputStyleProps="p-3 rounded-pill"
                            />

                            <FormField
                                name="password"
                                type="password"
                                label="Password"
                                isRequired={true}
                                onChange={handleChange}
                                InputComponent={CustomInput}
                                InputStyleProps="p-3 rounded-pill"
                            />

                            <Button onClick={handleContactClick} className="bg-primary fixed-bottom">
                                Go to ContactForm
                            </Button>
                        </div>
                    </FormComponent>
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
