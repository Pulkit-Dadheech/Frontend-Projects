import React from "react";
import {FormStore} from "../store/FormStore";
import {observer} from "mobx-react-lite";
import {Button,Form, FormGroup, FormText, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {IRegisterFormProps} from "../App";

interface IRegisterForm{
    RegisterForm:FormStore<IRegisterFormProps>;
}

export const RegisterForm:React.FC<IRegisterForm> = observer(({RegisterForm}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        RegisterForm.updateFormData(name as keyof IRegisterFormProps, value);
    };


    return (
        <div className="Register-Form">
            <h2>Sign In</h2>
            <Form className="form" >
                <FormGroup>
                    <Label
                        for="exampleEmail" hidden
                    >Username
                    </Label>
                    <Input
                        type={"text"}
                        name={"username"}
                        placeholder={"Name"}
                        value={RegisterForm.formData.username}
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
                        value={RegisterForm.formData.email}
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
                        value={RegisterForm.formData.password}
                        onChange={handleChange}
                    />
                    <FormText>Your password must be unique.</FormText>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </div>
    )
});

