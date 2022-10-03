import React, { useState } from "react";
import SignUpButton from "../components/buttons/SignUpButton";
import { useNavigate } from "react-router-dom"
import SignInForm from "./signInForm"

function Login() {

    const [user, setUser] = useState({email: "", password: ""});
    const [error, setError] = useState("");

    const Logs = details => {
        console.log(details);

        if (details.email == "Example@ex" && details.password == "password"){
            console.log("logged In");
            setUser({
                email:details.email,
                password: details.password
            })
        } else {
            console.log("Invalid input");
            setError("Invalid Login");
        }

    }

    const Logout = () => {
        console.log("Logout");
    }
    return (
        <div>
            {(user.email != "") ? (
                <div className="welcome">
                    <h2> Welcome! </h2>
                </div>
            ) : (
                <SignInForm Login={Logs} error={error} />
            )}
           

            <p>New User?</p>
            <SignUpButton/>

        </div>
    )

}
export default Login;