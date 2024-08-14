import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { PUBLIC_PATHS } from "./constants";
import { ForgotPassword } from "../pages/forgotPassword/Index";

export default function UnAuthenticatedApp() {
  const { LOGIN, FORGOT_PASSWORD } = PUBLIC_PATHS;

  return (
    <>
      <Switch>
        <Route path={LOGIN} exact component={Login} />
        <Route path={FORGOT_PASSWORD} exact component={ForgotPassword} />
        <Route path="/*" component={Login} />
      </Switch>
    </>
  );
}
