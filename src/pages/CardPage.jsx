import { useParams } from "react-router-dom";
import styled from "styled-components";
import cards from "../../data";

const StyledCardPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background-color: #eaeef6;
`;

const StyledCardTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const StyledCardContent = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  text-align: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const StyledTextarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  height: 100px;
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

function CardPage() {
  const { id } = useParams();
  const card = cards.find((c) => c.id === id);

  if (!card) {
    return (
      <StyledCardPage>
        <StyledCardTitle>Карточка не найдена</StyledCardTitle>
        <StyledCardContent>
          <p>Карточка с ID: {id} не существует.</p>
        </StyledCardContent>
      </StyledCardPage>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Логика сохранения изменений (пока заглушка)
    console.log("Карточка обновлена:", card);
  };

  return (
    <StyledCardPage>
      <StyledCardTitle>Карточка #{id}</StyledCardTitle>
      <StyledCardContent>
        <p>Просмотр и редактирование карточки с ID: {id}</p>
        <StyledForm onSubmit={handleSubmit}>
          <StyledInput
            type="text"
            defaultValue={card.title}
            placeholder="Название задачи"
          />
          <StyledTextarea
            defaultValue={card.description || "Нет описания"}
            placeholder="Описание задачи"
          />
          <StyledInput
            type="text"
            defaultValue={card.topic}
            placeholder="Категория"
          />
          <StyledInput
            type="text"
            defaultValue={card.date}
            placeholder="Дата"
          />
          <StyledButton type="submit">Сохранить</StyledButton>
        </StyledForm>
      </StyledCardContent>
    </StyledCardPage>
  );
}

export default CardPage;
