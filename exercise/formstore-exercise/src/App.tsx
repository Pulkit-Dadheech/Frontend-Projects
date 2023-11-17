import React from 'react';
import './App.css';
import {RegisterForm} from "./components/RegisterForm";
import {FormStore} from "./store/FormStore";

export interface IRegisterFormProps {
    username: string;
    email: string;
    password: string;
}

export const registerFormStore = new FormStore<IRegisterFormProps>({
    username: "",
    email: "",
    password: "",
});

function App() {
    return (
        <div className="App">
            <RegisterForm RegisterForm={registerFormStore} />
        </div>
    );
}

export default App;
