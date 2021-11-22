import styled from "styled-components";
import { Col } from "antd";

export const ProductListContainer = styled.div`
  margin: 16px auto;
  padding: 0 16px;
  max-width: 1280px;
  width: 100%;
`;

export const FilterContainer = styled.div`
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  overflow: hidden;
`;

export const FilterTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
  height: 36px;
  font-size: 18px;
  background-color: #13c2c2;
  color: white;
`;

export const FilterItem = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 8px;
  border-top: 1px solid #f0f0f0;
  cursor: pointer;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;
`;

export const ImageContent = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  transition: all 0.3s;
`;

export const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);

    ${ImageContent} {
      transform: scale(1.2);
    }
  }
`;

export const ProductCol = styled(Col)`
  padding: 0;
`;
