import React from "react";
import SignInConfirmButton from "../components/buttons/SingInConfirmButton";
import SignUpButton from "../components/buttons/SignUpButton";

function Login() {

    return (
        <div>
            <input type="text" placeholder="username" />
            <input type="text" placeholder="password" />
            <SignInConfirmButton/>
            <p>New User?</p>
            <SignUpButton/>

        </div>
    )

}
export default Login;