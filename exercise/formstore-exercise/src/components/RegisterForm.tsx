import React from "react";
import {observer} from "mobx-react-lite";
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FormStore} from "../store/FormStore";
import {useRouterStore} from "mobx-state-router";
import "./RegisterForm.css";
import {toJS} from "mobx";
import FormField from "./FormField";
import FormWrapper from "./FormWrapper";
import {InputType} from "reactstrap/types/lib/Input";
import {CustomInput} from "./InputComponent";


export interface IRegisterFormProps {
    username: string;
    email: string;
    password: string;
}

export type TInputRendererProps = {
    name: string;
    type: InputType;
    className: string
};


const registerFormStore = new FormStore<IRegisterFormProps>({
    username: "",
    email: "",
    password: "",
});


export const RegisterForm = observer(() => {
    const routerStore = useRouterStore();

    const handleContactClick = () => {
        routerStore.goTo('contact', {
            params: {id: 'contact'},
        });
    };

    function handleSubmit<T>(formData: T) {
        console.log(toJS(formData));
    }

    function handleReset(e: React.SyntheticEvent) {
        e.preventDefault();
    }


    return (
        <div className={"Register-Form-Container"}>
            <div className={"Register-Form"}>
                <div className=" left-column text-center d-flex flex-column bg-white p-4">
                    <FormWrapper<IRegisterFormProps>
                        formStore={registerFormStore}
                        onSubmit={handleSubmit}
                        onReset={handleReset}
                    >
                        <div className="register-form-content p-4 mt-3 mb-5">
                            <h2 className="text-uppercase font-weight-bolder text-center mb-3">Sign In</h2>

                            <FormField
                                name={"username"}
                                label="Username"
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
                                name={"password"}
                                label="Password"
                                isRequired={true}
                                render={({fieldProps}) => (
                                    <CustomInput
                                        type="password"
                                        className="p-3 rounded-pill"
                                        {...fieldProps}
                                    />
                                )}
                            />
                            <Button onClick={handleContactClick} className="bg-primary fixed-bottom">
                                Go to ContactForm
                            </Button>
                        </div>
                    </FormWrapper>
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
