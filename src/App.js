import React, { useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "styled-components";
import jwtDecode from "jwt-decode";
import "moment/locale/vi";
import { useTranslation } from "react-i18next";

import "./utils/locales";

import PublishRoute from "./layouts/PublishRoute";
import PrivateRoute from "./layouts/PrivateRoute";
import AdminRoute from "./layouts/AdminRoute";
import LoginRoute from "./layouts/LoginRoute";

import HomePage from "./pages/user/Home";
import ProductListPage from "./pages/user/ProductList";
import ProductDetailPage from "./pages/user/ProductDetail";
import CartPage from "./pages/user/Cart";
import ProfilePage from "./pages/user/Profile";
import ToDoListAntDPage from "./pages/user/ToDoListAntD";

import AdminDashboardPage from "./pages/admin/Dashboard";
import AdminProductListPage from "./pages/admin/ProductList";
import AdminModifyProductPage from "./pages/admin/ModifyProduct";

import LoginAndRegisterPage from "./pages/LoginAndRegister";
import NotFoundPage from "./pages/NotFound";

import { ROUTER } from "./constants/router";

import { darkTheme, lightTheme } from "./themes";

import { getUserInfoAction, getCartListAction } from "./redux/actions";

import "./App.css";
import "antd/dist/antd.less";

function App() {
  // const [isTop, setIsTop] = useState(true)
  const location = useLocation();
  const { i18n } = useTranslation();
  const localSelectedLang = localStorage.getItem("lang");

  const { theme } = useSelector((state) => state.commonReducer);
  const { userInfo } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const localStorageUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (localStorageUserInfo) {
      const decodedUserData = jwtDecode(localStorageUserInfo.accessToken);
      dispatch(getUserInfoAction({ id: decodedUserData.sub }));
    }
  }, []);

  useEffect(() => {
    if (userInfo.data.id) {
      dispatch(getCartListAction({ userId: userInfo.data.id }));
    }
  }, [userInfo.data.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (localSelectedLang) i18n.changeLanguage(localSelectedLang);
  }, [localSelectedLang]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;
  //     if (currentScrollY > 0 && isTop) {
  //       setIsTop(false)
  //     } else {
  //       setIsTop(true)
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [])

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Switch>
        <PublishRoute exact path={ROUTER.USER.HOME} component={HomePage} />
        <PublishRoute
          exact
          path={ROUTER.USER.PRODUCT_LIST}
          component={ProductListPage}
        />
        <PublishRoute
          exact
          path={ROUTER.USER.TO_DO_LIST_ANTD}
          component={ToDoListAntDPage}
        />
        <PublishRoute
          exact
          path={ROUTER.USER.PRODUCT_DETAIL}
          component={ProductDetailPage}
        />
        <PrivateRoute exact path={ROUTER.USER.CART} component={CartPage} />
        <PrivateRoute
          exact
          path={ROUTER.USER.PROFILE}
          component={ProfilePage}
        />
        <AdminRoute
          exact
          path={ROUTER.ADMIN.DASHBOARD}
          component={AdminDashboardPage}
        />
        <AdminRoute
          exact
          path={ROUTER.ADMIN.PRODUCT_LIST}
          component={AdminProductListPage}
        />
        <AdminRoute
          exact
          path={ROUTER.ADMIN.CREATE_PRODUCT}
          component={AdminModifyProductPage}
        />
        <AdminRoute
          exact
          path={ROUTER.ADMIN.UPDATE_PRODUCT}
          component={AdminModifyProductPage}
        />
        <LoginRoute
          exact
          path={ROUTER.LOGIN}
          component={LoginAndRegisterPage}
        />
        <Route path={ROUTER.NOT_FOUND} component={NotFoundPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
