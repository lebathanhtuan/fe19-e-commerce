import React from "react";
import { Route, Redirect } from "react-router-dom";

import UserHeader from "../UserHeader";
import Footer from "../Footer";

import { ROUTER } from "../../constants/router";

const PrivateRoute = ({ component: Component, ...props }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo) {
    return <Redirect to={ROUTER.USER.HOME} />;
  }

  return (
    <Route
      {...props}
      render={(routeProps) => (
        <>
          <UserHeader />
          <Component {...routeProps} />
          <Footer />
        </>
      )}
    />
  );
};

export default PrivateRoute;
