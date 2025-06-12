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

  useEffect(() => {
    if (loading || !token) return;

    async function loadTasks() {
      try {
        const fetchedTasks = await fetchTasks({ token });
        setTasks(fetchedTasks || []);
      } catch (err) {
        setError(err.message);
      }
    }

    loadTasks();
  }, [loading, token]);

  if (loading) return <StyledLoading>Данные загружаются...</StyledLoading>;
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
