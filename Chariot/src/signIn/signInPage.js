import React from "react";
import { useHistory } from "react-rounter-dom";
import SignInConfirmButton from "../components/buttons/SingInConfirmButton";
import SignUpButton from "../components/buttons/SignUpButton";

function Login() {
    let history = useHistory();

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