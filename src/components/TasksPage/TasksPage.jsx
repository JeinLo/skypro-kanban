import React, { useState } from "react";
import TaskModal from "../TaskModal/TaskModal";
import {
  PageWrapper,
  Title,
  CreateButton,
  TaskList,
  TaskItem,
} from "./TasksPage.styled";

function TasksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateTask = (task) => {
    setTasks((prev) => [...prev, task]);
    closeModal();
  };

  return (
    <PageWrapper>
      <Title>Задачи</Title>
      <CreateButton onClick={openModal}>Создать задачу</CreateButton>

      <TaskModal isOpen={isModalOpen} onClose={closeModal} onCreateTask={handleCreateTask} />

      {tasks.length === 0 && <p>Пока нет задач</p>}

      <TaskList>
        {tasks.map((task, i) => (
          <TaskItem key={i}>
            <strong>{task.name}</strong> <br />
            Категория: {task.category} <br />
            Срок: {task.dueDate.toLocaleDateString("ru-RU")} <br />
            Описание: {task.description}
          </TaskItem>
        ))}
      </TaskList>
    </PageWrapper>
  );
}

export default TasksPage;
