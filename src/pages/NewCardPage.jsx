import styled from "styled-components";

const StyledNewCardPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background-color: #eaeef6;
`;

const StyledTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const StyledForm = styled.form`
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

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const StyledButton = styled.button`
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

function NewCardPage() {
  return (
    <StyledNewCardPage>
      <StyledTitle>Добавить новую задачу</StyledTitle>
      <StyledForm>
        <StyledInput type="text" placeholder="Название задачи" />
        <StyledInput type="text" placeholder="Описание задачи" />
        <StyledButton type="submit">Создать задачу</StyledButton>
      </StyledForm>
    </StyledNewCardPage>
  );
}

export default NewCardPage;
