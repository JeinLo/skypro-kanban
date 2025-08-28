import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTask, editTask, deleteTask } from "../services/api";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  Form,
  InputWrapper,
  InputLabel,
  Input,
  TextareaWrapper,
  TextareaLabel,
  Textarea,
  CalendarWrapper,
  CalendarLabel,
  SelectedDateText,
  Button,
  CategoryWrapper,
  Category,
  TaskInfo,
  EditButton,
  DeleteButton,
} from "./CardPage.styled";
import Calendar from "../components/Calendar/Calendar";

const categories = [
  { id: 1, name: "Web Design" },
  { id: 2, name: "Research" },
  { id: 3, name: "Copywriting" },
];

function CardPage({ token, theme, tasks, setTasks }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [status, setStatus] = useState("Без статуса");

  useEffect(() => {
    if (token) {
      getTask({ id, token })
        .then((data) => {
          setTask(data);
          setTitle(data.title || "");
          setDescription(data.description || "");
          setCategory(data.topic || null);
          setDueDate(data.date ? new Date(data.date) : null);
          setStatus(data.status || "Без статуса");
        })
        .catch((err) => console.error("Ошибка загрузки задачи:", err.message));
    }
  }, [id, token]);

  if (!task) return null;

  const handleCategoryClick = (cat) => {
    if (isEditing) setCategory(cat === category ? null : cat);
  };

  const handleDateSelect = (date) => {
    if (isEditing) setDueDate(date);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !category || !dueDate || !token) {
      return;
    }
    editTask({ id, token, task: { title, description, topic: category, date: dueDate.toISOString(), status } })
      .then((updatedTasks) => {
        setTasks(updatedTasks);
        setIsEditing(false);
        navigate("/");
      })
      .catch((err) => console.error("Ошибка редактирования:", err.message));
  };

  const handleDelete = () => {
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
    <ModalOverlay $isDarkTheme={theme === "dark"} onClick={() => navigate("/")}>
      <ModalContent $isDarkTheme={theme === "dark"} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle $isDarkTheme={theme === "dark"}>Просмотр задачи</ModalTitle>
          <CloseButton $isDarkTheme={theme === "dark"} onClick={() => navigate("/")} aria-label="Закрыть модалку">
            &times;
          </CloseButton>
        </ModalHeader>
        <Form $isDarkTheme={theme === "dark"} onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "20px", flexGrow: 1 }}>
            <div style={{ flex: 1 }}>
              <InputWrapper>
                <InputLabel $isDarkTheme={theme === "dark"}>Название задачи</InputLabel>
                <Input
                  $isDarkTheme={theme === "dark"}
                  type="text"
                  value={title}
                  onChange={(e) => isEditing && setTitle(e.target.value)}
                  disabled={!isEditing}
                />
              </InputWrapper>
              <TextareaWrapper>
                <TextareaLabel $isDarkTheme={theme === "dark"} style={{ marginTop: "20px" }}>Описание задачи</TextareaLabel>
                <Textarea
                  $isDarkTheme={theme === "dark"}
                  value={description}
                  onChange={(e) => isEditing && setDescription(e.target.value)}
                  disabled={!isEditing}
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
                {dueDate ? `Срок исполнения: ${dueDate.toLocaleDateString("ru-RU")}` : "Срок исполнения"}
              </SelectedDateText>
            </CalendarWrapper>
          </div>
          <CategoryWrapper>
            <InputLabel $isDarkTheme={theme === "dark"}>Категории</InputLabel>
            <div style={{ display: "flex", gap: "10px" }}>
              {categories.map((cat) => (
                <Category
                  key={cat.id}
                  $isActive={cat.name === category}
                  $isDarkTheme={theme === "dark"}
                  onClick={() => handleCategoryClick(cat.name)}
                  disabled={!isEditing}
                >
                  {cat.name}
                </Category>
              ))}
            </div>
          </CategoryWrapper>
          <TaskInfo $isDarkTheme={theme === "dark"}>
            <p>Статус: {status}</p>
            <p>Срок исполнения: {dueDate ? dueDate.toLocaleDateString("ru-RU") : "Не указан"}</p>
            <p>Описание: {description || "Не указано"}</p>
          </TaskInfo>
          {!isEditing ? (
            <EditButton $isDarkTheme={theme === "dark"} onClick={handleEdit}>Редактировать задачу</EditButton>
          ) : (
            <Button $isDarkTheme={theme === "dark"} type="submit">Сохранить</Button>
          )}
          <DeleteButton $isDarkTheme={theme === "dark"} onClick={handleDelete}>Удалить задачу</DeleteButton>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default CardPage;