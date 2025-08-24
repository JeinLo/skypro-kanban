import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "../components/Column/Column";
import { fetchTasks, editTask } from "../services/api";
import { useOutletContext } from "react-router-dom";

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

function MainPage({ loading: initialLoading, token, theme, tasks: initialTasks }) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(initialLoading);
  const { setTasks } = useOutletContext();

  useEffect(() => {
    if (!initialLoading && token && initialTasks.length === 0) {
      setIsLoading(true);
      fetchTasks({ token })
        .then((tasksData) => {
          console.log("Данные из fetchTasks:", tasksData);
          setTasks(tasksData);
        })
        .catch((err) => {
          console.error("Ошибка загрузки задач:", err.message);
          setError(err.message || "Ошибка загрузки задач");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [initialLoading, token, initialTasks.length, setTasks]);

  if (isLoading) return <Loader theme={theme}>Загрузка...</Loader>;
  if (error) return <ErrorMessage theme={theme}>{error}</ErrorMessage>;

  const columnTitles = [
    "Без статуса",
    "Нужно сделать",
    "В работе",
    "Тестирование",
    "Готово",
  ];

  const handleDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    const sourceColumnIndex = parseInt(source.droppableId);
    const destColumnIndex = parseInt(destination.droppableId);
    const sourceColumnTitle = columnTitles[sourceColumnIndex];
    const destColumnTitle = columnTitles[destColumnIndex];

    const movedCard = initialTasks.find((task, index) =>
      task.status.toLowerCase() === sourceColumnTitle.toLowerCase() &&
      index === source.index
    );

    if (!movedCard) {
      console.error("Задача не найдена:", source.index, sourceColumnTitle);
      return;
    }

    const updatedCard = {
      ...movedCard,
      status: destColumnTitle,
      userId: movedCard.userId, // Передаем userId
      title: movedCard.title,
      topic: movedCard.topic,
      date: new Date(movedCard.date).toISOString(), // Формат ISO для даты
      description: movedCard.description || "",
    };

    console.log("Отправляемые данные в editTask:", { id: movedCard._id, task: updatedCard });

    try {
      const updatedTasks = await editTask({ id: movedCard._id, token, task: updatedCard });
      setTasks(updatedTasks);
    } catch (err) {
      console.error("Ошибка при сохранении статуса задачи:", err.message);
      setError(`Ошибка при сохранении статуса задачи: ${err.message}`);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <StyledMain theme={theme}>
        {columnTitles.map((title, index) => (
          <Column
            key={index}
            columnId={String(index)}
            title={title}
            cards={initialTasks}
            theme={theme}
            token={token}
          />
        ))}
      </StyledMain>
    </DragDropContext>
  );
}

export default MainPage;