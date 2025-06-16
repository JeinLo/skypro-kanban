import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card/Card";
import { fetchTaskById } from "../services/api";

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

const StyledError = styled.p`
  color: red;
  text-align: center;
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
        const data = await fetchTaskById({ token, id });
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
        <Card topic={task.topic} title={task.title} date={task.date} />

        <StyledActions>
          <StyledButton onClick={() => navigate(`/card/${id}/edit`)}>
            Редактировать
          </StyledButton>
          <StyledButton
            onClick={() => navigate("/")}
            style={{ backgroundColor: "#dc3545" }}
          >
            Удалить
          </StyledButton>
        </StyledActions>

        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3>Описание:</h3>
          <p>{task.description || "Нет описания"}</p>

          <h3 style={{ marginTop: "10px" }}>Статус:</h3>
          <p>{task.status || "Не указан"}</p>
        </div>
      </StyledCardContainer>
    </StyledCardPage>
  );
}

export default CardPage;
