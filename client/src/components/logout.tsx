import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = "448540240533-9eq2nc4un10n8dn1ru2ifeu6mohp7p30.apps.googleusercontent.com";

function Logout() {
    const onSuccess = () => {
        console.log("Successfully logged out");
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