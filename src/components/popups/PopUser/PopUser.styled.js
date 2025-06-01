import styled from "styled-components";

export const StyledPopUser = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 200px;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  z-index: 10;
`;

export const StyledName = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const StyledEmail = styled.div`
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 10px;
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  border: none;
  background-color: #f8f9fa;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const StyledButton = styled.button`
  background-color: #dc3545;
  color: #ffffff;
  padding: 8px;
  border: none;
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #c82333;
  }
`;
