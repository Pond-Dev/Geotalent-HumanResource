import React from "react";
import { Route, Redirect } from "react-router";
import { useLocation } from "react-router-dom";

const PrivateRoute = ({ component, isAuthenticated, ...rest }: any) => {
  const location = useLocation();

  const routeComponent = (props: any) =>
    isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: location.pathname }}> </Redirect>
    );

  return <Route {...rest} render={routeComponent} />;
};

export default PrivateRoute;
