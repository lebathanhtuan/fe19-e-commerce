import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { ROUTER } from '../../constants/router'

import * as S from './styles'

const SIDEBAR_ITEMS = [
  {
    title: "Dashboard",
    path: ROUTER.ADMIN.DASHBOARD,
  },
  {
    title: "Quản lý sản phẩm",
    path: ROUTER.ADMIN.PRODUCT_LIST,
  },
];

function AdminSidebar() {
  let history = useHistory();
  let location = useLocation();

  const { isShowSidebar } = useSelector((state) => state.commonReducer)

  const renderSidebarItems = () => {
    return SIDEBAR_ITEMS.map((item, index) => {
      return (
        <div
          key={index}
          className={
            item.path === location.pathname
              ? "sidebar-item active"
              : "sidebar-item"
          }
          onClick={() => history.push(item.path)}
        >
          {item.title}
        </div>
      );
    });
  };
  return (
    <S.SidebarContainer active={isShowSidebar}>
      {renderSidebarItems()}
    </S.SidebarContainer>
  );
}

export default AdminSidebar;
