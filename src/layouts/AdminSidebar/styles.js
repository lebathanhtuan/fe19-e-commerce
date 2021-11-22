import styled, { css } from "styled-components";

export const SidebarContainer = styled.div`
  position: absolute;
  top: 0;
  left: -250px;
  width: 250px;
  height: 100%;
  background-color: cadetblue;
  overflow: hidden;
  transition: all 0.3s;

  ${({ active }) =>
    active &&
    css`
      left: 0;
    `}
`;
