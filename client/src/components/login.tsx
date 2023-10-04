import { GoogleLogin } from 'react-google-login';

const clientId = "448540240533-9eq2nc4un10n8dn1ru2ifeu6mohp7p30.apps.googleusercontent.com";

function Login() {
    const onSuccess = (res: any) => {
        console.log("Success", res.profileObj);
    }

    const onFailure = (res: any) => {
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
            />
        </div>
    );
}

export default Login;