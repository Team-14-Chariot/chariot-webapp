import React from "react";
import SignInConfirmButton from "../components/buttons/SignInConfirmationButton";
import SignUpButton from "../components/buttons/SignUpButton";
import { useNavigate } from "react-router-dom"

function Login() {
    let history = useNavigate();

    return (
        <div>
            <input type="text" placeholder="username" />
            <input type="text" placeholder="password" />
            <SignInConfirmButton onClick ={() => {
                history.pushState("/home-page-generic");
            }}/>
            <p>New User?</p>
            <SignUpButton/>

        </div>
    )

}
export default Login;