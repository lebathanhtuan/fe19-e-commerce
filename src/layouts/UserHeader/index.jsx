import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Select, Button, Space, Dropdown, Menu, Badge } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { ROUTER } from "../../constants/router";
import { setThemeAction, logoutAction } from "../../redux/actions";

import * as S from "./styles";

function UserHeader() {
  const history = useHistory();
  const { i18n } = useTranslation();
  const selectedLang = localStorage.getItem("lang") || i18n.language;

  const { theme } = useSelector((state) => state.commonReducer);
  const { userInfo } = useSelector((state) => state.authReducer);
  const { cartList } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(logoutAction());
  };

  return (
    <S.Header>
      <h2
        style={{ color: "white", margin: 0, cursor: "pointer" }}
        onClick={() => history.push(ROUTER.USER.HOME)}
      >
        LOGO
      </h2>
      <Space size={32}>
        <Select
          value={theme}
          onChange={(value) => dispatch(setThemeAction(value))}
          style={{ width: 100 }}
        >
          <Select.Option value="light">Light</Select.Option>
          <Select.Option value="dark">Dark</Select.Option>
        </Select>
        <Select
          onChange={(value) => {
            i18n.changeLanguage(value);
            localStorage.setItem("lang", value);
          }}
          value={selectedLang}
          style={{ width: 100 }}
        >
          <Select.Option value="en">Tiếng Anh</Select.Option>
          <Select.Option value="vi">Tiếng Việt</Select.Option>
        </Select>
        <Badge count={cartList.data.length}>
          <Button
            icon={<ShoppingCartOutlined style={{ color: "white" }} />}
            type="text"
            onClick={() =>
              history.push({
                pathname: ROUTER.USER.CART,
                state: {
                  checkoutStep: 0,
                },
              })
            }
          ></Button>
        </Badge>
        {userInfo.data.name ? (
          <Dropdown
            overlay={
              <Menu>
                {userInfo.data.role === "admin" && (
                  <Menu.Item
                    key="0"
                    onClick={() => history.push(ROUTER.ADMIN.DASHBOARD)}
                  >
                    Admin Page
                  </Menu.Item>
                )}
                <Menu.Item
                  key="1"
                  onClick={() => history.push(ROUTER.USER.PROFILE)}
                >
                  My Profile
                </Menu.Item>
                <Menu.Item key="2" onClick={() => handleLogout()}>
                  Logout
                </Menu.Item>
              </Menu>
            }
          >
            <Space>
              <UserOutlined style={{ color: "white" }} />
              <div style={{ color: "white" }}>{userInfo.data.name}</div>
            </Space>
          </Dropdown>
        ) : (
          <Button onClick={() => history.push(ROUTER.LOGIN)}>Đăng nhập</Button>
        )}
      </Space>
    </S.Header>
  );
}

export default UserHeader;
