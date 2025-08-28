import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import TaskModal from "../TaskModal/TaskModal";
import Card from "../Card/Card";
import { fetchTasks, editTask } from "../api";
import {
  PageWrapper,
  Title,
  CreateButton,
  TaskList,
} from "./TasksPage.styled";

function TasksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [token] = useState("your-token-here"); // Замени на реальный токен

  useEffect(() => {
    fetchTasks({ token })
      .then((data) => setTasks(data))
      .catch((err) => setError(`Ошибка загрузки задач: ${err.message}`));
  }, [token]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateTask = (task) => {
    postTask({ token, task })
      .then((data) => {
        setTasks(data);
        closeModal();
      })
      .catch((err) => setError(`Ошибка создания задачи: ${err.message}`));
  };

  const handleDeleteTask = (taskId) => {
    deleteTask({ id: taskId, token })
      .then((data) => setTasks(data))
      .catch((err) => setError(`Ошибка удаления задачи: ${err.message}`));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumnTitle = source.droppableId;
    const destColumnTitle = destination.droppableId;

    // Находим карточку по _id
    const movedCard = tasks.find((task) => task._id === result.draggableId);
    if (!movedCard) {
      console.error("Карточка не найдена:", result.draggableId);
      return;
    }

    // Проверяем соответствие исходной колонки
    if (movedCard.status.toLowerCase() !== sourceColumnTitle.toLowerCase()) {
      console.error("Статус карточки не соответствует исходной колонке:", movedCard.status, sourceColumnTitle);
      return;
    }

    // Оптимистичное обновление
    const updatedCard = { ...movedCard, status: destColumnTitle };
    const optimisticTasks = tasks.map((task) =>
      task._id === movedCard._id ? updatedCard : task
    );
    setTasks(optimisticTasks);

    // Запрос к бекенду
    editTask({ id: movedCard._id, token, task: updatedCard })
      .then(() => {
        console.log("Статус задачи успешно обновлен");
      })
      .catch((err) => {
        console.error("Ошибка при сохранении статуса задачи:", err.message);
        setError(`Ошибка при сохранении статуса задачи: ${err.message}`);
        // Откатываем изменения
        setTasks(tasks);
      });
  };

  return (
    <PageWrapper>
      <Title>Задачи</Title>
      <CreateButton onClick={openModal}>Создать задачу</CreateButton>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <TaskModal isOpen={isModalOpen} onClose={closeModal} onCreateTask={handleCreateTask} />

      {tasks.length === 0 && !error && <p>Пока нет задач</p>}

      <DragDropContext onDragEnd={onDragEnd}>
        {["в работе", "готово"].map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                {tasks
                  .filter((task) => task.status.toLowerCase() === status.toLowerCase())
                  .map((task, index) => (
                    <Card
                      key={task._id}
                      card={task}
                      index={index}
                      theme="light" // Замени на динамическую тему
                      token={token}
                      onDeleteTask={handleDeleteTask}
                    />
                  ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </PageWrapper>
  );
}

export default TasksPage;