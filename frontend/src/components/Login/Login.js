import React from "react";
import { Link } from "react-router-dom";
import "./Login.css"

export default function Login(){
    return (

        <div class="form-container">
            <h1> Login Here!</h1>
                <section>
    
                    <input className="usernameBox" type="text" name="username" placeholder="Username"/>
                    <br />
                    <input className="passwordBox" type="password" name="password" placeholder="Password"/>
                    <br />
                    <button type="button" >Login</button>
                    <br />
    
                    <Link to='/sign-up'>Don't have an account yet? Sign Up Here </Link>
    
                </section>
        </div>
    )
};