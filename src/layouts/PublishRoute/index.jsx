import React from "react";
import { Route } from "react-router-dom";

import UserHeader from "../UserHeader";
import Footer from "../Footer";

const PublishRoute = ({ component: Component, ...props }) => {
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

export default PublishRoute;
