import React from "react";
import { Route, Switch } from "react-router-dom";
import { Dashboard } from "./components";

const PrivateRoutes = (): JSX.Element => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact={true} path={"/"} component={Dashboard} />
        <Route exact={true} path={"/folder/:folderId"} component={Dashboard} />
      </Switch>
    </React.Fragment>
  );
};

export default PrivateRoutes;
