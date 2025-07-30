import styled from "styled-components";
import { Link } from "react-router-dom";

export const SHeader = styled.header`
  background-color: #ffffff;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Logo = styled.div`
  img {
    height: 24px;
    width: auto;
  }
`;

export const StyledActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const StyledTaskLink = styled(Link)`
  background-color: #007bff;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 16px;
  display: inline-block;
  &:hover {
    background-color: #0056b3;
  }
`;

export const StyledUserLink = styled.div`
  color: #000000;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  &:hover {
    text-decoration: underline;
  }
`;

export const StyledArrow = styled.span`
  font-size: 12px;
  color: #000000;
`;