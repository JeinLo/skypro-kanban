import React, { useState } from "react";
import TaskModal from "../TaskModal/TaskModal";
import Card from "../Card/Card"; // Предполагаем, что канбан-доска использует Card
import {
  PageWrapper,
  Title,
  CreateButton,
  TaskList,
} from "./TasksPage.styled";

function TasksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([
    { _id: "1", title: "Задача 1", description: "Описание 1", topic: "Web Design", date: new Date(), status: "В работе" },
    { _id: "2", title: "Задача 2", description: "Описание 2", topic: "Research", date: new Date(), status: "Готово" },
  ]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateTask = (task) => {
    setTasks((prev) => [...prev, { ...task, _id: Date.now().toString() }]);
    closeModal();
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task._id !== taskId));
  };

  return (
    <PageWrapper>
      <Title>Задачи</Title>
      <CreateButton onClick={openModal}>Создать задачу</CreateButton>

      <TaskModal isOpen={isModalOpen} onClose={closeModal} onCreateTask={handleCreateTask} />

      {tasks.length === 0 && <p>Пока нет задач</p>}

      <TaskList>
        {tasks.map((task, index) => (
          <Card
            key={task._id}
            card={task}
            index={index}
            theme="light" // Замените на динамическую тему
            token="token" // Замените на реальный токен
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </TaskList>
    </PageWrapper>
  );
}

export default TasksPage;