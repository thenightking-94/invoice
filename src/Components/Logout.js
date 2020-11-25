import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { Typography, Divider } from '@material-ui/core';
require('dotenv').config()


function Logout() {
    const onSuccess = () => {
        alert('You have been logged out !!');
        window.location.assign('/');
        localStorage.clear();
    };

    return (

        <GoogleLogout
            clientId={process.env.REACT_APP_AUTH}
            buttonText="Logout"
            onLogoutSuccess={onSuccess}
        />

    );
}

export default Logout;