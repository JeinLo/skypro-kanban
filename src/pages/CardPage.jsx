import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card/Card";
import { getTask } from "../services/api"; // Заменили fetchTaskById на getTask

const StyledCardPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background-color: #eaeef6;
`;

const StyledCardContainer = styled.div`
  width: 100%;
  max-width: 600px;
`;

const StyledActions = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled.button`
  background-color: #565eef;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #3f53d8;
  }
`;

const StyledDeleteButton = styled(StyledButton)`
  background-color: #dc3545;
  &:hover {
    background-color: #c82333;
  }
`;

const StyledError = styled.p`
  color: red;
  text-align: center;
`;

const StyledDescription = styled.div`
  margin-top: 20px;
  text-align: left;
`;

const StyledDescriptionTitle = styled.h3`
  margin-bottom: 10px;
`;

const StyledStatusTitle = styled.h3`
  margin-top: 20px;
  margin-bottom: 10px;
`;

function CardPage({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTask() {
      if (!token) {
        setError("Ошибка доступа: требуется авторизация");
        setLoading(false);
        return;
      }

      try {
        const data = await getTask({ token, id }); // Используем getTask
        setTask(data);
        setLoading(false);
      } catch (err) {
        console.error("Ошибка загрузки задачи:", err.message);
        setError(err.message || "Задача не найдена");
        setLoading(false);
      }
    }

    loadTask();
  }, [token, id]);

  if (loading) {
    return <StyledCardPage>Загрузка...</StyledCardPage>;
  }

  if (error) {
    return (
      <StyledCardPage>
        <StyledError>{error}</StyledError>
        <StyledButton onClick={() => navigate(-1)}>Назад</StyledButton>
      </StyledCardPage>
    );
  }

  return (
    <StyledCardPage>
      <StyledCardContainer>
        <Card topic={task.topic} title={task.title} date={task.date} id={task.id} token={token} />

        <StyledActions>
          <StyledButton onClick={() => navigate(`/card/${id}/edit`)}>
            Редактировать
          </StyledButton>
          <StyledDeleteButton onClick={() => navigate("/")}>
            Удалить
          </StyledDeleteButton>
        </StyledActions>

        <StyledDescription>
          <StyledDescriptionTitle>Описание:</StyledDescriptionTitle>
          <p>{task.description || "Нет описания"}</p>

          <StyledStatusTitle>Статус:</StyledStatusTitle>
          <p>{task.status || "Не указан"}</p>
        </StyledDescription>
      </StyledCardContainer>
    </StyledCardPage>
  );
}

export default CardPage;