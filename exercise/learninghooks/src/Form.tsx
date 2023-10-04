import './form.css';
import React, {useState} from "react";


export function Form() {
    const [formData, setFormData] = useState({
        userName: "",
        userEmail: ""
    })

    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event.target.value);
        
        setFormData({
            ...formData,
            userName: event.target.value,
        })

    }

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event.target.value);
        setFormData({
            ...formData,
            userEmail: event.target.value,
        })
    }

    return (
        <form>
            <div className="container">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr/>
                <label htmlFor="name"><b>Name</b></label>
                <input type="text" placeholder="Enter Name" name="userName" id="name"
                       onChange={e => handleNameChange(e)}/>
                <label htmlFor="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" id="email"
                       onChange={e => handleEmailChange(e)}/>
                <label htmlFor="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" id="psw"/>

                <button type="submit" className="registerbtn">Register</button>
                <p>Your name is {formData.userName} and Email is {formData.userEmail}</p>
            </div>
        </form>
    );
}
