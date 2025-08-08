import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "../components/Column/Column";
import { fetchTasks, postTask } from "../services/api";

const StyledMain = styled.div`
  padding: 20px;
  display: flex;
  gap: 20px;
  min-height: 100vh;
  position: relative;
  background-color: ${({ theme }) => (theme === "dark" ? "#1a1a1a" : "#e5e7eb")};
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

const Loader = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(270deg, ${({ theme }) => (theme === "dark" ? "#2a2a2a" : "#e0e7ff")}, ${({ theme }) => (theme === "dark" ? "#333" : "#c7d2fe")}, ${({ theme }) => (theme === "dark" ? "#2a2a2a" : "#e0e7ff")});
  background-size: 600% 600%;
  animation: ${gradientAnimation} 3s ease infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => (theme === "dark" ? "#ff6666" : "red")};
  text-align: center;
  font-size: 16px;
  padding: 20px;
`;

function MainPage({ loading, token, theme }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    async function loadTasks() {
      if (!token) {
        setError("Требуется авторизация");
        setIsLoading(false);
        return;
      }

      try {
        const tasks = await fetchTasks({ token });
        setTasks(tasks || []);
        setIsLoading(false);
      } catch (err) {
        console.error("Ошибка загрузки задач:", err.message);
        setError(err.message || "Ошибка загрузки задач");
        setIsLoading(false);
        if (err.message.includes("401")) {
          setError("Требуется авторизация");
        }
      }
    }

    loadTasks();
  }, [loading, token]);

  const handleCreateTask = async (task) => {
    if (!token) {
      setError("Требуется авторизация");
      return;
    }

    try {
      const newTask = await postTask({ token, task });
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (err) {
      setError(err.message || "Ошибка создания задачи");
    }
  };

  if (isLoading) return <Loader theme={theme}>Загрузка...</Loader>;
  if (error) return <ErrorMessage theme={theme}>{error}</ErrorMessage>;

  const columns = {
    "Без статуса": { title: "БЕЗ СТАТУСА", cards: [] },
    "Нужно сделать": { title: "НУЖНО СДЕЛАТЬ", cards: [] },
    "В работе": { title: "В РАБОТЕ", cards: [] },
    "Тестирование": { title: "ТЕСТИРОВАНИЕ", cards: [] },
    "Готово": { title: "ГОТОВО", cards: [] },
  };

  tasks.forEach((task) => {
    if (columns[task.status]) {
      columns[task.status].cards.push(task);
    }
  });

  return (
    <DragDropContext>
      <StyledMain theme={theme}>
        {Object.entries(columns).map(([status, column]) => (
          <Column
            key={status}
            columnId={status}
            title={column.title}
            cards={column.cards}
            theme={theme}
          />
        ))}
      </StyledMain>
    </DragDropContext>
  );
}

export default MainPage;