import React from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

const clientId = "448540240533-9eq2nc4un10n8dn1ru2ifeu6mohp7p30.apps.googleusercontent.com";

function Login() {
    const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        if ('profileObj' in res) {
            console.log("Success", res.profileObj);
        } else {
            console.log("Success", res);
        }
    }

    const onFailure = (res: GoogleLoginResponse) => {
        console.log("Failure", res);
    }

    return (
        <div id="signInButton">
            <GoogleLogin
                clientId={clientId}
                buttonText='Login'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy="single_host_origin"
                isSignedIn={true}
                className='login-button'
            />
        </div>
    );
}

export default Login;