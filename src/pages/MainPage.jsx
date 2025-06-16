import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Column from "../components/Column/Column";
import { fetchTasks } from "../services/api";

const StyledMain = styled.div`
  padding: 20px;
  flex-grow: 1;
`;

const StyledError = styled.p`
  color: red;
  text-align: center;
`;

const StyledLoading = styled.p`
  text-align: center;
`;

function MainPage({ loading, token }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    async function loadTasks() {
      try {
        console.log("Loading tasks with token:", token);
        const tasks = await fetchTasks({ token });
        setTasks(tasks || []);
        setIsLoading(false);
      } catch (err) {
        console.error("Load tasks error:", err.message);
        setError(err.message || "Ошибка загрузки задач");
        setIsLoading(false);
        if (err.message.includes("401")) {
          setError("Требуется авторизация");
        }
      }
    }

    if (token) {
      loadTasks();
    } else {
      setError("Требуется авторизация");
      setIsLoading(false);
    }
  }, [loading, token]);

  if (isLoading) return <StyledLoading>Загрузка...</StyledLoading>;
  if (error) return <StyledError>{error}</StyledError>;

  const statuses = [
    "Без статуса",
    "Нужно сделать",
    "В работе",
    "Тестирование",
    "Готово",
  ];

  return (
    <StyledMain>
      <h2>Канбан-доска</h2>
      {statuses.map((status) => (
        <Column
          key={status}
          title={status}
          cards={tasks.filter((task) => task.status === status)}
        />
      ))}
    </StyledMain>
  );
}

export default MainPage;
