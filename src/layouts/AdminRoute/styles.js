import styled, { css } from "styled-components";

export const MainContainer = styled.div`
  position: relative;
  min-height: calc(100vh - 120px);
`;

export const MainContent = styled.div`
  padding: 16px;
  width: 100%;
  height: 100%;
  transition: all 0.3s;
  
  ${({ isShowSidebar }) =>
    isShowSidebar &&
    css`
      margin-left: 250px;
      width: calc(100% - 250px);
    `}
`;
