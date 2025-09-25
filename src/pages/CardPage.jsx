import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTask, editTask, deleteTask } from '../services/api';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  Form,
  InputWrapper,
  InputLabel,
  StatusButton,
  TextareaWrapper,
  TextareaLabel,
  Textarea,
  CalendarWrapper,
  CalendarLabel,
  SelectedDateText,
  ButtonGroup,
  Button,
  Category,
  FormContent,
} from './CardPage.styled';
import Calendar from '../components/Calendar/Calendar';
import { AuthContext } from '../contexts/AuthContext';
import { TaskContext } from '../contexts/TaskContext';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const ErrorMessage = styled.div`
  color: ${props => props.theme.error};
  font-size: 14px;
  margin: 10px 0;
  text-align: center;
`;

const statuses = ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово'];

function CardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { tasks, setTasks } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [originalTask, setOriginalTask] = useState(null);
  const [task, setTask] = useState(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [status, setStatus] = useState('Без статуса');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      getTask({ id, token })
        .then((data) => {
          setOriginalTask(data);
          setTask(data);
          setDescription(data.description || '');
          setCategory(data.topic || null);
          setDueDate(data.date ? new Date(data.date) : null);
          setStatus(data.status || 'Без статуса');
        })
        .catch((err) => {
          setError(err.message);
          toast.error(err.message || 'Ошибка загрузки задачи');
        });
    }
  }, [id, token]);

  if (!task) return error ? <ErrorMessage>{error}</ErrorMessage> : null;

  const handleCategoryClick = () => {};

  const handleStatusClick = (newStatus) => {
    if (isEditing && newStatus !== status) {
      setStatus(newStatus);
    }
  };

  const handleDateSelect = (date) => {
    if (isEditing) setDueDate(date);
  };

  const validateForm = () => {
    if (!description.trim()) {
      setError('Описание не может быть пустым');
      return false;
    }
    if (!dueDate) {
      setError('Выберите дату выполнения');
      return false;
    }
    if (!category) {
      setError('Выберите категорию');
      return false;
    }
    return true;
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
    setError(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!validateForm()) {
      toast.error(error);
      return;
    }

    const updatedTaskData = {
      title: originalTask.title,
      description,
      topic: category,
      date: dueDate.toISOString(),
      status,
      userId: originalTask.userId,
    };

    editTask({ id, token, task: updatedTaskData })
      .then((updatedTasks) => {
        setTasks(updatedTasks);
        setIsEditing(false);
        toast.success('Задача успешно обновлена!');
        navigate('/');
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message || 'Ошибка при сохранении задачи');
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(false);
    setError(null);
    if (originalTask) {
      setDescription(originalTask.description || '');
      setCategory(originalTask.topic || null);
      setDueDate(originalTask.date ? new Date(originalTask.date) : null);
      setStatus(originalTask.status || 'Без статуса');
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (token) {
      deleteTask({ id, token })
        .then((updatedTasks) => {
          setTasks(updatedTasks);
          toast.success('Задача успешно удалена!');
          navigate('/');
        })
        .catch((err) => {
          if (err.message.includes('Ошибка авторизации')) {
            navigate('/login');
          } else {
            setError(err.message);
            toast.error(err.message || 'Ошибка при удалении задачи');
          }
        });
    }
  };

  return (
    <ModalOverlay
      onClick={(e) => {
        if (e.target === e.currentTarget && !isEditing) navigate('/');
      }}
    >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ModalHeader>
          <ModalTitle>{task.title || 'Название задачи'}</ModalTitle>
          {category && (
            <Category
              $category={category}
              onClick={() => handleCategoryClick(category)}
              style={{ cursor: isEditing ? 'pointer' : 'default' }}
            >
              {category}
            </Category>
          )}
        </ModalHeader>
        <Form onSubmit={handleSave}>
          <InputWrapper>
            <InputLabel>Статус</InputLabel>
            {isEditing ? (
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {statuses.map((stat) => (
                  <StatusButton
                    key={stat}
                    $isActive={stat === status}
                    onClick={() => handleStatusClick(stat)}
                    type="button"
                    disabled={!isEditing}
                  >
                    {stat}
                  </StatusButton>
                ))}
              </div>
            ) : (
              <StatusButton $isActive={true} disabled={!isEditing}>
                {status}
              </StatusButton>
            )}
          </InputWrapper>
          <FormContent>
            <div style={{ flex: 1 }}>
              <TextareaWrapper>
                <TextareaLabel>Описание задачи</TextareaLabel>
                <Textarea
                  value={description}
                  onChange={(e) => isEditing && setDescription(e.target.value.trim())}
                  disabled={!isEditing}
                  placeholder="Введите описание задачи..."
                />
              </TextareaWrapper>
            </div>
            <CalendarWrapper>
              <CalendarLabel>Даты</CalendarLabel>
              <Calendar
                value={dueDate}
                onChange={handleDateSelect}
                disabled={!isEditing}
              />
              <SelectedDateText>
                {dueDate ? `Срок исполнения: ${dueDate.toLocaleDateString('ru-RU')}` : 'Срок исполнения'}
              </SelectedDateText>
            </CalendarWrapper>
          </FormContent>
          <ButtonGroup>
            {!isEditing ? (
              <>
                <Button type="button" onClick={handleEdit} $isSecondary>
                  Редактировать задачу
                </Button>
                <Button type="button" onClick={handleDelete} $isSecondary>
                  Удалить задачу
                </Button>
                <Button type="button" onClick={() => navigate('/')} $isClose>
                  Закрыть
                </Button>
              </>
            ) : (
              <>
                <Button type="submit">
                  Сохранить
                </Button>
                <Button type="button" onClick={handleCancel} $isCancel>
                  Отменить
                </Button>
                <Button type="button" onClick={handleDelete} $isSecondary>
                  Удалить задачу
                </Button>
                <Button type="button" onClick={() => navigate('/')} $isClose>
                  Закрыть
                </Button>
              </>
            )}
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default CardPage;