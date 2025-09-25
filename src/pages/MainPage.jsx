import React, { useState, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { DragDropContext } from '@hello-pangea/dnd';
import Column from '../components/Column/Column';
import { editTask } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import { TaskContext } from '../contexts/TaskContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container } from '../styles/Global.styled';

const StyledMain = styled.div`
  padding: 20px;
  display: flex;
  gap: 20px;
  min-height: 100vh;
  position: relative;
  background-color: ${props => props.theme.background};
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Loader = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    270deg,
    ${props => props.theme.modalBackground},
    ${props => props.theme.secondary},
    ${props => props.theme.modalBackground}
  );
  background-size: 600% 600%;
  animation: ${gradientAnimation} 4s ease infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.text};
`;

const EmptyMessage = styled.div`
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.secondary};
  padding: 20px;
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.error};
  text-align: center;
  font-size: 16px;
  padding: 20px;
`;

function MainPage() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { tasks, setTasks, loading, error } = useContext(TaskContext);
  const [dragError, setDragError] = useState('');

  if (loading) return <Loader>Загрузка задач...</Loader>;
  if (error) {
    if (error.includes('авторизации')) {
      navigate('/login');
      return null;
    }
    return <ErrorMessage>{error}</ErrorMessage>;
  }
  if (dragError) return <ErrorMessage>{dragError}</ErrorMessage>;
  if (tasks.length === 0) {
    return <EmptyMessage>Новых задач нет</EmptyMessage>;
  }

  const columnTitles = [
    'Без статуса',
    'Нужно сделать',
    'В работе',
    'Тестирование',
    'Готово',
  ];

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const sourceColumnTitle = columnTitles[parseInt(source.droppableId)];
    const destColumnTitle = columnTitles[parseInt(destination.droppableId)];

    const movedCard = tasks.find((task) => task._id === draggableId);
    if (!movedCard) {
      setDragError('Задача не найдена');
      toast.error('Задача не найдена');
      return;
    }

    if (
      !movedCard.status ||
      movedCard.status.toLowerCase() !== sourceColumnTitle.toLowerCase()
    ) {
      setDragError('Некорректный статус задачи или несоответствие колонке');
      toast.error('Некорректный статус задачи или несоответствие колонке');
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
      toast.success('Статус задачи успешно обновлен');
      setDragError('');
    } catch (err) {
      setDragError(`Ошибка при сохранении статуса задачи: ${err.message}`);
      toast.error(`Ошибка при сохранении статуса задачи: ${err.message}`);
      setTasks(tasks);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Container>
        <StyledMain>
          {columnTitles.map((title, index) => (
            <Column
              key={index}
              columnId={String(index)}
              title={title}
              cards={tasks}
              token={token}
            />
          ))}
        </StyledMain>
      </Container>
    </DragDropContext>
  );
}

export default MainPage;