import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTask, editTask, deleteTask } from "../services/api";
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
} from "./CardPage.styled";
import Calendar from "../components/Calendar/Calendar";
import { toast } from 'react-toastify';

const statuses = ["Без статуса", "Нужно сделать", "В работе", "Тестирование", "Готово"];

function CardPage({ token, theme, tasks, setTasks }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [originalTask, setOriginalTask] = useState(null);
  const [task, setTask] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [status, setStatus] = useState("Без статуса");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      getTask({ id, token })
        .then((data) => {
          setOriginalTask(data);
          setTask(data);
          setDescription(data.description || "");
          setCategory(data.topic || null);
          setDueDate(data.date ? new Date(data.date) : null);
          setStatus(data.status || "Без статуса");
        })
        .catch((err) => {
          toast.error(err.message || 'Ошибка загрузки задачи');
          setError(err.message);
        });
    }
  }, [id, token]);

  if (!task) return error ? <p>{error}</p> : null;

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
      description: description.trim(),
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
        toast.error(err.message || 'Ошибка при сохранении задачи');
        setError(err.message);
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(false);
    setError(null);
    if (originalTask) {
      setDescription(originalTask.description || "");
      setCategory(originalTask.topic || null);
      setDueDate(originalTask.date ? new Date(originalTask.date) : null);
      setStatus(originalTask.status || "Без статуса");
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
            toast.error(err.message || 'Ошибка при удалении задачи');
            setError(err.message);
          }
        });
    }
  };

  return (
    <ModalOverlay
      $isDarkTheme={theme === "dark"}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isEditing) navigate('/');
      }}
    >
      <ModalContent
        $isDarkTheme={theme === "dark"}
        onClick={(e) => e.stopPropagation()}
      >
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ModalHeader>
          <ModalTitle $isDarkTheme={theme === "dark"}>{task.title || 'Название задачи'}</ModalTitle>
          {category && (
            <Category
              $isDarkTheme={theme === "dark"}
              $category={category}
              onClick={() => handleCategoryClick(category)}
              style={{ cursor: isEditing ? 'pointer' : 'default' }}
            >
              {category}
            </Category>
          )}
        </ModalHeader>
        <Form $isDarkTheme={theme === "dark"} onSubmit={handleSave}>
          <InputWrapper>
            <InputLabel $isDarkTheme={theme === "dark"}>Статус</InputLabel>
            {isEditing ? (
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {statuses.map((stat) => (
                  <StatusButton
                    key={stat}
                    $isActive={stat === status}
                    $isDarkTheme={theme === "dark"}
                    onClick={() => handleStatusClick(stat)}
                    type="button"
                    disabled={!isEditing}
                  >
                    {stat}
                  </StatusButton>
                ))}
              </div>
            ) : (
              <StatusButton $isActive={true} $isDarkTheme={theme === "dark"} disabled={!isEditing}>
                {status}
              </StatusButton>
            )}
          </InputWrapper>
          <FormContent>
            <div style={{ flex: 1 }}>
              <TextareaWrapper>
                <TextareaLabel $isDarkTheme={theme === "dark"}>Описание задачи</TextareaLabel>
                <Textarea
                  $isDarkTheme={theme === "dark"}
                  value={description}
                  onChange={(e) => isEditing && setDescription(e.target.value.trim())}
                  disabled={!isEditing}
                  placeholder="Введите описание задачи..."
                />
              </TextareaWrapper>
            </div>
            <CalendarWrapper>
              <CalendarLabel $isDarkTheme={theme === "dark"}>Даты</CalendarLabel>
              <Calendar
                value={dueDate}
                onChange={handleDateSelect}
                $isDarkTheme={theme === "dark"}
                disabled={!isEditing}
              />
              <SelectedDateText $isDarkTheme={theme === "dark"}>
                {dueDate ? `Срок исполнения: ${dueDate.toLocaleDateString('ru-RU')}` : 'Срок исполнения'}
              </SelectedDateText>
            </CalendarWrapper>
          </FormContent>
          <ButtonGroup>
            {!isEditing ? (
              <>
                <Button $isDarkTheme={theme === "dark"} type="button" onClick={handleEdit} $isSecondary>
                  Редактировать задачу
                </Button>
                <Button $isDarkTheme={theme === "dark"} type="button" onClick={handleDelete} $isSecondary>
                  Удалить задачу
                </Button>
                <Button $isDarkTheme={theme === "dark"} type="button" onClick={() => navigate('/')} $isClose>
                  Закрыть
                </Button>
              </>
            ) : (
              <>
                <Button $isDarkTheme={theme === "dark"} type="submit">
                  Сохранить
                </Button>
                <Button $isDarkTheme={theme === "dark"} type="button" onClick={handleCancel} $isCancel>
                  Отменить
                </Button>
                <Button $isDarkTheme={theme === "dark"} type="button" onClick={handleDelete} $isSecondary>
                  Удалить задачу
                </Button>
                <Button $isDarkTheme={theme === "dark"} type="button" onClick={() => navigate('/')} $isClose>
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