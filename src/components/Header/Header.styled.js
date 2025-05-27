import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledHeader = styled.header`
  background-color: #ffffff;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StyledHeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

export const StyledHeaderNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const StyledLogo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
  text-decoration: none;
`;

export const StyledPrimaryButton = styled.div`
  color: #007bff;
  text-decoration: none;
  font-size: 16px;
  &:hover {
    text-decoration: underline;
  }
`;
