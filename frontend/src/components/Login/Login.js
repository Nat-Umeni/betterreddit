import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css"

export default function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeUsername = e => setUsername(e.target.value);
    const handleChangePassword = e => setPassword(e.target.value);

    const handleForm = async (e) => {
        e.preventDefault();
        let userData = {
            username: username,
            password: password
        };

        const response = await fetch("http://localhost:5000/login", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userData)
        });

        const data = response.json();
        console.log(data);
    }



    return (

        <div class="form-container">
            
                <form onSubmit={handleForm}>
                    
                    <h1> Login Here!</h1>
                    <input className="usernameBox" type="text" name="username" placeholder="Username" onChange={handleChangeUsername}/>
                    <br />
                    <input className="passwordBox" type="password" name="password" placeholder="Password" onChange={handleChangePassword}/>
                    <br />
                    <button type="submit" value="Login">Login</button>
                    <br />
    
                    <Link to='/sign-up'>Don't have an account yet? Sign Up Here </Link>

                </form>
                
        </div>
    )
};