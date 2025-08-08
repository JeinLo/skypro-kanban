import styled from "styled-components";
import { Link } from "react-router-dom";

export const SHeader = styled.header`
  background-color: ${({ theme }) => (theme === "dark" ? "#2a2a2a" : "#ffffff")};
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
`;

export const Logo = styled.div`
  img {
    height: 24px;
    width: auto;
    transition: filter 0.3s;
  }
`;

export const StyledActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const StyledTaskLink = styled(Link)`
  background-color: ${({ theme }) => (theme === "dark" ? "#007bff" : "#007bff")}; /* Оставляем синей */
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 16px;
  display: inline-block;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => (theme === "dark" ? "#0056b3" : "#0056b3")};
  }
`;

export const StyledUserLink = styled.div`
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.3s;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => (theme === "dark" ? "#3f53d8" : "#007bff")};
  }
`;

export const StyledArrow = styled.span`
  font-size: 12px;
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
  transition: color 0.3s;
`;