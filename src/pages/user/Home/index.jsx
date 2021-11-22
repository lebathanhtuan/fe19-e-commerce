import React from "react";
import { useHistory } from "react-router-dom";

import { ROUTER } from "../../../constants/router";

const HomePage = () => {
  const history = useHistory();
  return (
    <div>
      <h2>Home Page</h2>
      <h3 onClick={() => history.push(ROUTER.USER.PRODUCT_LIST)}>
        Product List
      </h3>
    </div>
  );
};

export default HomePage;
