import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css"


export default function Login(){

    const Navigate = useNavigate()

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

        try{
            const response = await fetch("http://localhost:3001/login", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userData)
        })

        if(response.ok){
            Navigate("/")
        }

        
    
        } catch(err){
            console.log(err)
        }        
    }



    return (
        
        <div className={styles.formContainer}>
            
            <form onSubmit={handleForm}>
                
                <h1> Login Here!</h1>
                
                <label htmlFor="username"> Username: </label>
                <input className="usernameBox" type="text" name="username" placeholder="Username" onChange={handleChangeUsername}/>

                <br />

                <label htmlFor="password"> Password: </label>
                <input className="passwordBox" type="password" name="password" placeholder="Password" onChange={handleChangePassword}/>

                <br />

                <button type="submit" value="Login">Login</button>
                
                <br />

                <Link to='/sign-up'>Don't have an account yet? Sign Up Here </Link>

                <br />
                <Link to='/'>Or go back to homepage, without signing in</Link>

            </form>
            
        </div>
       
    )
};