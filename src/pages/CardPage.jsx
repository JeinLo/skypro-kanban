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

const statuses = ["Без статуса", "Нужно сделать", "В работе", "Тестирование", "Готово"];

function CardPage({ token, theme, tasks, setTasks }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [originalTask, setOriginalTask] = useState(null); // Сохранение исходных данных
  const [task, setTask] = useState(null); // Текущее состояние задачи
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [status, setStatus] = useState("Без статуса");

  useEffect(() => {
    if (token) {
      getTask({ id, token })
        .then((data) => {
          setOriginalTask(data); // Сохраняем исходные данные
          setTask(data);
          setDescription(data.description || "");
          setCategory(data.topic || null);
          setDueDate(data.date ? new Date(data.date) : null);
          setStatus(data.status || "Без статуса");
          console.log("Задача загружена:", data);
        })
        .catch((err) => console.error("Ошибка загрузки задачи:", err.message));
    }
  }, [id, token]);

  if (!task) return null;

  const handleCategoryClick = (currentCat) => {
    if (isEditing) {
      const categories = ["Web Design", "Research", "Copywriting"];
      const currentIndex = categories.indexOf(currentCat);
      const nextIndex = (currentIndex + 1) % categories.length;
      setCategory(categories[nextIndex]);
    }
  };

  const handleStatusClick = (newStatus) => {
    if (isEditing && newStatus !== status) {
      setStatus(newStatus); // Обновляем локальное состояние статуса
    }
  };

  const handleDateSelect = (date) => {
    if (isEditing) setDueDate(date);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
    console.log("Переход в режим редактирования, текущее состояние:", {
      description,
      category,
      dueDate,
      status,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!description.trim() || !category || !dueDate || !token) return;

    const updatedTaskData = {
      description,
      topic: category,
      date: dueDate.toISOString(),
      status,
    };

    editTask({ id, token, task: updatedTaskData })
      .then((updatedTasks) => {
        setTasks(updatedTasks); // Обновляем глобальное состояние задач
        setIsEditing(false);
        navigate("/"); // Возвращаемся на главную страницу
      })
      .catch((err) => console.error("Ошибка редактирования:", err.message));
  };

  const handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(false);
    // Восстанавливаем исходные данные из originalTask
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
    if (window.confirm("Вы уверены, что хотите удалить задачу?") && token) {
      deleteTask({ id, token })
        .then((updatedTasks) => {
          setTasks(updatedTasks);
          navigate("/");
        })
        .catch((err) => {
          if (err.message.includes("Ошибка авторизации")) {
            navigate("/login");
          } else {
            console.error("Ошибка удаления:", err.message);
          }
        });
    }
  };

  return (
    <ModalOverlay
      $isDarkTheme={theme === "dark"}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isEditing) navigate("/");
      }}
    >
      <ModalContent
        $isDarkTheme={theme === "dark"}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <ModalTitle $isDarkTheme={theme === "dark"}>
            {task.title || "Название задачи"} {/* Используем task.title */}
          </ModalTitle>
          {category && (
            <Category
              $isDarkTheme={theme === "dark"}
              $isActive={true}
              $category={category}
              onClick={() => handleCategoryClick(category)}
              style={{ cursor: isEditing ? "pointer" : "default" }}
            >
              {category}
            </Category>
          )}
        </ModalHeader>
        <Form $isDarkTheme={theme === "dark"} onSubmit={handleSave}>
          <InputWrapper>
            <InputLabel $isDarkTheme={theme === "dark"}>Статус</InputLabel>
            {isEditing ? (
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
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
              <StatusButton
                $isActive={true}
                $isDarkTheme={theme === "dark"}
                disabled={!isEditing}
              >
                {status}
              </StatusButton>
            )}
          </InputWrapper>
          <FormContent>
            <div style={{ flex: 1 }}>
              <TextareaWrapper>
                <TextareaLabel $isDarkTheme={theme === "dark"}>
                  Описание задачи
                </TextareaLabel>
                <Textarea
                  $isDarkTheme={theme === "dark"}
                  value={description}
                  onChange={(e) => isEditing && setDescription(e.target.value)}
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
                {dueDate
                  ? `Срок исполнения: ${dueDate.toLocaleDateString("ru-RU")}`
                  : "Срок исполнения"}
              </SelectedDateText>
            </CalendarWrapper>
          </FormContent>
          <ButtonGroup>
            {!isEditing ? (
              <>
                <Button
                  $isDarkTheme={theme === "dark"}
                  type="button"
                  onClick={handleEdit}
                  $isSecondary
                >
                  Редактировать задачу
                </Button>
                <Button
                  $isDarkTheme={theme === "dark"}
                  type="button"
                  onClick={handleDelete}
                  $isSecondary
                >
                  Удалить задачу
                </Button>
                <Button
                  $isDarkTheme={theme === "dark"}
                  type="button"
                  onClick={() => navigate("/")}
                  $isClose
                >
                  Закрыть
                </Button>
              </>
            ) : (
              <>
                <Button
                  $isDarkTheme={theme === "dark"}
                  type="submit"
                >
                  Сохранить
                </Button>
                <Button
                  $isDarkTheme={theme === "dark"}
                  type="button"
                  onClick={handleCancel}
                  $isCancel
                >
                  Отменить
                </Button>
                <Button
                  $isDarkTheme={theme === "dark"}
                  type="button"
                  onClick={handleDelete}
                  $isSecondary
                >
                  Удалить задачу
                </Button>
                <Button
                  $isDarkTheme={theme === "dark"}
                  type="button"
                  onClick={() => navigate("/")}
                  $isClose
                >
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