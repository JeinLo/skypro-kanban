import React, { useState, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "../components/Column/Column";
import { editTask } from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import { TaskContext } from "../contexts/TaskContext";
import { useNavigate } from "react-router-dom";

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

function MainPage({ theme }) {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { tasks, setTasks, loading, error } = useContext(TaskContext);
  const [dragError, setDragError] = useState(""); // Переименовано для отличия от error из TaskContext

  if (loading) return <Loader theme={theme}>Загрузка...</Loader>;
  if (error) {
    if (error.includes("авторизации")) {
      navigate("/login"); // Перенаправление на страницу входа при ошибке авторизации
      return null;
    }
    return <ErrorMessage theme={theme}>{error}</ErrorMessage>;
  }
  if (dragError) return <ErrorMessage theme={theme}>{dragError}</ErrorMessage>;

  const columnTitles = [
    "Без статуса",
    "Нужно сделать",
    "В работе",
    "Тестирование",
    "Готово",
  ];

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const sourceColumnTitle = columnTitles[parseInt(source.droppableId)];
    const destColumnTitle = columnTitles[parseInt(destination.droppableId)];

    const movedCard = tasks.find((task) => task._id === draggableId);
    if (!movedCard) {
      console.error("Задача не найдена:", draggableId);
      setDragError("Задача не найдена");
      return;
    }

    if (!movedCard.status || movedCard.status.toLowerCase() !== sourceColumnTitle.toLowerCase()) {
      console.error("Некорректный статус задачи или несоответствие колонке:", movedCard.status, sourceColumnTitle);
      setDragError("Некорректный статус задачи или несоответствие колонке");
      return;
    }

    const updatedCard = {
      ...movedCard,
      status: destColumnTitle,
      userId: movedCard.userId,
      title: movedCard.title,
      topic: movedCard.topic,
      date: movedCard.date,
    };

    const optimisticTasks = tasks.map((task) =>
      task._id === movedCard._id ? updatedCard : task
    );
    setTasks(optimisticTasks);

    try {
      await editTask({ id: movedCard._id, token, task: updatedCard });
      console.log("Статус задачи успешно обновлен");
      setDragError(""); // Сбрасываем ошибку при успехе
    } catch (err) {
      console.error("Ошибка при сохранении статуса задачи:", err.message);
      setDragError(`Ошибка при сохранении статуса задачи: ${err.message}`);
      setTasks(tasks); // Откатываем изменения при ошибке
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
            cards={tasks}
            theme={theme}
            token={token}
          />
        ))}
      </StyledMain>
    </DragDropContext>
  );
}

export default MainPage;