import styled from "styled-components";

export const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 56px;
  background-color: ${({ theme }) => theme.header};
`;
