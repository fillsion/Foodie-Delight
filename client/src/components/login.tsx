import React, {useContext} from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { UserContext } from '../context/User';

const clientId = "448540240533-9eq2nc4un10n8dn1ru2ifeu6mohp7p30.apps.googleusercontent.com";

function Login() {
    const { setIsLogged, setUserEmail } = useContext(UserContext); 

    const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        if ('profileObj' in res) {
            console.log("Success", res.profileObj);
            setIsLogged(true);
            setUserEmail(res.profileObj.email)
        } else {
            console.log("Success", res);
        }
    }

    const onFailure = (res: GoogleLoginResponse) => {
        console.log("Failure", res);
        setIsLogged(false);
        setUserEmail('');
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