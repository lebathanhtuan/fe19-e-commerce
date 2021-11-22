import styled, { css } from "styled-components";

export const SidebarContainer = styled.div`
  width: 0;
  background-color: cadetblue;
  overflow: hidden;
  transition: all 0.3s;

  ${({ active }) =>
    active &&
    css`
      width: 250px;
    `}
`;
