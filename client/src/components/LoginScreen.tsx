import React, { useEffect } from "react";
import Login from "./login";
import Logout from "./logout";
import { gapi } from "gapi-script";

const clientId = "448540240533-9eq2nc4un10n8dn1ru2ifeu6mohp7p30.apps.googleusercontent.com";

export default function LoginScreen() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);
  return (
    <div className="login-container">
      <Login />
      <Logout />
    </div>
  );
}
