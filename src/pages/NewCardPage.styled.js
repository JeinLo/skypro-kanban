import styled from "styled-components";

export const StyledNewCardPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background-color: #eaeef6;
`;

export const StyledTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const StyledForm = styled.form`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const StyledButton = styled.button`
  background-color: #28a745;
  color: #ffffff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

export const StyledCalendar = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 40px);
  gap: 5px;
  margin: 10px 0;
`;

export const StyledDay = styled.div`
  padding: 10px;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "#007bff" : "#f8f9fa")};
  color: ${(props) => (props.isSelected ? "#ffffff" : "#000000")};
  border-radius: 4px;
  font-weight: ${(props) => (props.isToday ? "bold" : "normal")};
  &:hover {
    background-color: #e0e0e0;
  }
`;

export const StyledDateLabel = styled.div`
  font-size: 16px;
  margin-top: 10px;
`;

export const StyledCategoryWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
`;

export const StyledCategory = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => (props.isActive ? "#007bff" : "#f8f9fa")};
  color: ${(props) => (props.isActive ? "#ffffff" : "#000000")};
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.isActive ? "#0056b3" : "#e0e0e0")};
  }
`;
