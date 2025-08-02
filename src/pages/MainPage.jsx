import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "../components/Column/Column";
import { fetchTasks, editTask } from "../services/api";

const StyledMain = styled.div`
  padding: 20px;
  display: flex;
  gap: 20px;
  min-height: 100vh;
`;

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

const Loader = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(270deg, #e0e7ff, #c7d2fe, #e0e7ff);
  background-size: 600% 600%;
  animation: ${gradientAnimation} 3s ease infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #000000;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 16px;
  padding: 20px;
`;

function MainPage({ loading, token }) {
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

  const handleDragEnd = async (result) => {
    const { destination, source } = result;

    if (!destination || destination.droppableId === source.droppableId) return;

    const draggedTask = tasks.find((task) => task.id === Number(result.draggableId));

    if (!draggedTask) return;

    const newStatus = destination.droppableId;
    const updatedTask = { ...draggedTask, status: newStatus };

    try {
      await editTask({ token, task: updatedTask, id: draggedTask.id });
      setTasks(tasks.map((task) => (task.id === draggedTask.id ? updatedTask : task)));
    } catch (err) {
      setError("Не удалось обновить статус задачи");
      console.error("Ошибка обновления статуса задачи:", err);
    }
  };

  if (isLoading) return <Loader>Загрузка...</Loader>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  const columns = {
    "Без статуса": { title: "Без статуса", cards: [] },
    "Нужно сделать": { title: "Нужно сделать", cards: [] },
    "В работе": { title: "В работе", cards: [] },
    "Тестирование": { title: "Тестирование", cards: [] },
    "Готово": { title: "Готово", cards: [] },
  };

  tasks.forEach((task) => {
    if (columns[task.status]) {
      columns[task.status].cards.push(task);
    }
  });

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <StyledMain>
        {Object.entries(columns).map(([status, column]) => (
          <Column
            key={status}
            columnId={status}
            title={column.title}
            cards={column.cards}
          />
        ))}
      </StyledMain>
    </DragDropContext>
  );
}

export default MainPage;