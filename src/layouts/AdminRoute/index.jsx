import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import AdminHeader from "../AdminHeader";
import AdminSidebar from "../AdminSidebar";
import Footer from "../Footer";

import { ROUTER } from '../../constants/router'

import * as S from './styles'

const AdminRoute = ({
  component: Component,
  ...props
}) => {
  const { isShowSidebar } = useSelector((state) => state.commonReducer)

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (!userInfo) {
    return <Redirect to={ROUTER.LOGIN} />
  } else if (userInfo.role !== 'admin') {
    return <Redirect to={ROUTER.USER.HOME} />
  }
  return (
    <Route
      {...props}
      render={(routeProps) => (
        <>
          <AdminHeader />
          <S.MainContainer>
            <AdminSidebar />
            <S.MainContent isShowSidebar={isShowSidebar}>
              <Component {...routeProps} />
            </S.MainContent>
          </S.MainContainer>
          <Footer />
        </>
      )}
    />
  );
};

export default AdminRoute;
