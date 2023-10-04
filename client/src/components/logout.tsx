import React, {useContext} from 'react';
import { GoogleLogout } from 'react-google-login';
import { UserContext } from '../context/User';

const clientId = "448540240533-9eq2nc4un10n8dn1ru2ifeu6mohp7p30.apps.googleusercontent.com";

function Logout() {
    const { setIsLogged, setUserEmail } = useContext(UserContext); 

    const onSuccess = () => {
        console.log("Successfully logged out");
        setIsLogged(false);
        setUserEmail('')
    }

    return (
        <div id="signOutButton">
            <GoogleLogout
                clientId={clientId}
                onLogoutSuccess={onSuccess}
                className='login-button'
            />
        </div>
    );
}

export default Logout;