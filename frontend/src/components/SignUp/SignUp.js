import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SignUp.module.css";




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

    <div className={styles.formContainer}>

            <form onSubmit={handleForm} >

                <h1>Sign Up Below</h1>
                <label htmlFor="username"> Username: </label>
                <input type="text" name="username" placeholder="Username" onChange={handleChangeUsername}/>

                <br />

                <label htmlFor="password" aria-required> Password: </label>
                <input type="password" name="password" placeholder="Password" onChange={handleChangePassword}/>

                <br />

                <label htmlFor="Repeated Password"> Repeat Password: </label>
                <input type="password" name="Repeated Password" placeholder="Repeat Password"/>

                <br />

                <input type="submit" value="Create Account"/>
                <br />

                <span id="errorPara"></span>
                <br />

                <Link to='/login'>Already have an account? Log in here!</Link>

                <br />
                <Link id="homepage" to='/'>Or go back to homepage, without signing in</Link>

            </form>

    </div>
        
    );
}