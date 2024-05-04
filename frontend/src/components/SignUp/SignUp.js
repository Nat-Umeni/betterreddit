import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";




export default function SignUp(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')

    const handleChangeUsername = e => setUsername(e.target.value);
    const handleChangePassword = e => setPassword(e.target.value);

    const handleForm = async (e) => {
        e.preventDefault();
        let userData = {
            username: username,
            password: password
        }
        /*Using this to check if the form button and handleForm funtion was working */

        console.log("clicked");

        try {
            const response = await fetch("http://localhost:3001/sign-up", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userData)
        });

        const data = response.json();
        console.log(data);

        } catch(err){
            console.log(err);
        }
    }

    return (

    <div class="form-container">

            <form onSubmit={handleForm} >

                <h1>Sign Up Below</h1>
                <label for="username"> Username: </label>
                <input type="text" name="username" placeholder="Username" onChange={handleChangeUsername}/>

                <br />

                <label for="password"> Password: </label>
                <input type="password" name="password" placeholder="Password" onChange={handleChangePassword}/>

                <br />

                <label for="Repeated Password"> Repeat Password: </label>
                <input type="password" name="Repeated Password" placeholder="Repeat Password"/>

                <br />

                <input type="submit" value="Create Account"/>

                <br />
                <Link to='/login'>Already have an account? Log in here!</Link>

            </form>

    </div>
        
    );
}