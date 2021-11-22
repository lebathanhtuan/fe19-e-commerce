import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { Select, Button, Space, Dropdown, Menu } from "antd";
import { MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";

import { ROUTER } from "../../constants/router";
import {
  setThemeAction,
  toggleSidebarAction,
  logoutAction,
} from "../../redux/actions";

import * as S from "./styles";

// function Header({ theme, setTheme, toggleSidebar }) {
function Header() {
  const history = useHistory();

  const { theme } = useSelector((state) => state.commonReducer);
  const { userInfo } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(logoutAction());
    history.push(ROUTER.LOGIN)
  };

  return (
    <S.Header>
      <Button
        type="text"
        icon={<MenuUnfoldOutlined style={{ color: "white" }} />}
        onClick={() => dispatch(toggleSidebarAction())}
      ></Button>
      <Space size={32}>
        <Select
          value={theme}
          onChange={(value) => dispatch(setThemeAction(value))}
          style={{ width: 100 }}
        >
          <Select.Option value="light">Light</Select.Option>
          <Select.Option value="dark">Dark</Select.Option>
        </Select>
        {userInfo.data.name ? (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="0">My Profile</Menu.Item>
                <Menu.Item key="1" onClick={() => handleLogout()}>
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

// const mapStateToProps = (state) => {
//   const { theme } = state.commonReducer
//   return {
//     theme: theme
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setTheme: (params) => dispatch(setThemeAction(params)),
//     toggleSidebar: () => dispatch(toggleSidebarAction()),
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Header);

export default Header;
