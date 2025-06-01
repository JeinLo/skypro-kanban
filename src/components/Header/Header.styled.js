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
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
`;

export const StyledActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const StyledTaskLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-size: 16px;
  &:hover {
    text-decoration: underline;
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
