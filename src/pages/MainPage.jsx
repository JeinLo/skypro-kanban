import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "../components/Column/Column";
import { fetchTasks, editTask } from "../services/api";
import { useOutletContext } from "react-router-dom";
import { toast } from 'react-toastify';

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

const EmptyMessage = styled.div`
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => (theme === "dark" ? "#b0b0b0" : "#94A6BE")};
  padding: 20px;
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
  if (error) return <ErrorMessage theme={theme}>{error} </ErrorMessage>;
  if (initialTasks.length === 0) return <EmptyMessage theme={theme}>Новых задач нет</EmptyMessage>;

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

    // Находим карточку по _id
    const movedCard = initialTasks.find((task) => task._id === draggableId);
    if (!movedCard) {
      console.error("Задача не найдена:", draggableId);
      toast.error('Задача не найдена');
      return;
    }

    // Проверяем, что карточка находится в исходной колонке
    if (movedCard.status.toLowerCase() !== sourceColumnTitle.toLowerCase()) {
      console.error("Статус карточки не соответствует исходной колонке:", movedCard.status, sourceColumnTitle);
      toast.error('Некорректный статус задачи или несоответствие колонке');
      return;
    }

    // Формируем обновленную карточку
    const updatedCard = {
      ...movedCard,
      status: destColumnTitle,
      userId: movedCard.userId,
      title: movedCard.title,
      topic: movedCard.topic,
      date: movedCard.date,
    };

    // Оптимистичное обновление состояния
    const optimisticTasks = initialTasks.map((task) =>
      task._id === movedCard._id ? updatedCard : task
    );
    setTasks(optimisticTasks);

    // Запрос к бэкенду
    try {
      await editTask({ id: movedCard._id, token, task: updatedCard });
      console.log("Статус задачи успешно обновлен");
      toast.success('Статус задачи успешно обновлен');
    } catch (err) {
      console.error("Ошибка при сохранении статуса задачи:", err.message);
      setError(`Ошибка при сохранении статуса задачи: ${err.message}`);
      toast.error(err.message || 'Ошибка при сохранении статуса задачи');
      // Откатываем оптимистичное обновление в случае ошибки
      setTasks(initialTasks);
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