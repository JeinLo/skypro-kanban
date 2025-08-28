import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTask, editTask, deleteTask } from "../api";
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
} from "./CardDetail.styled";
import Calendar from "../Calendar/Calendar";

const categories = [
  { id: 1, name: "Web Design" },
  { id: 2, name: "Research" },
  { id: 3, name: "Copywriting" },
];

function CardDetail({ token }) {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [status, setStatus] = useState("Без статуса");

  useEffect(() => {
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
    if (!title.trim() || !category || !dueDate) {
      return;
    }
    editTask({ id, token, task: { title, description, topic: category, date: dueDate.toISOString(), status } })
      .then(() => setIsEditing(false))
      .catch((err) => console.error("Ошибка редактирования:", err.message));
  };

  const handleDelete = () => {
    if (window.confirm("Вы уверены, что хотите удалить задачу?")) {
      deleteTask({ id, token })
        .then(() => window.history.back())
        .catch((err) => {
          if (err.message.includes("Ошибка авторизации")) {
            window.location.href = "/login"; // Переход на вход при 401
          } else {
            console.error("Ошибка удаления:", err.message);
          }
        });
    }
  };

  return (
    <ModalOverlay $isDarkTheme={false} onClick={() => window.history.back()}>
      <ModalContent $isDarkTheme={false} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle $isDarkTheme={false}>Просмотр задачи</ModalTitle>
          <CloseButton $isDarkTheme={false} onClick={() => window.history.back()} aria-label="Закрыть модалку">
            &times;
          </CloseButton>
        </ModalHeader>
        <Form $isDarkTheme={false} onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "20px", flexGrow: 1 }}>
            <div style={{ flex: 1 }}>
              <InputWrapper>
                <InputLabel $isDarkTheme={false}>Название задачи</InputLabel>
                <Input
                  $isDarkTheme={false}
                  type="text"
                  value={title}
                  onChange={(e) => isEditing && setTitle(e.target.value)}
                  disabled={!isEditing}
                />
              </InputWrapper>
              <TextareaWrapper>
                <TextareaLabel $isDarkTheme={false} style={{ marginTop: "20px" }}>Описание задачи</TextareaLabel>
                <Textarea
                  $isDarkTheme={false}
                  value={description}
                  onChange={(e) => isEditing && setDescription(e.target.value)}
                  disabled={!isEditing}
                />
              </TextareaWrapper>
            </div>
            <CalendarWrapper>
              <CalendarLabel $isDarkTheme={false}>Даты</CalendarLabel>
              <Calendar
                value={dueDate}
                onChange={handleDateSelect}
                $isDarkTheme={false}
                disabled={!isEditing}
              />
              <SelectedDateText $isDarkTheme={false}>
                {dueDate ? `Срок исполнения: ${dueDate.toLocaleDateString("ru-RU")}` : "Срок исполнения"}
              </SelectedDateText>
            </CalendarWrapper>
          </div>
          <CategoryWrapper>
            <InputLabel $isDarkTheme={false}>Категории</InputLabel>
            <div style={{ display: "flex", gap: "10px" }}>
              {categories.map((cat) => (
                <Category
                  key={cat.id}
                  $isActive={cat.name === category}
                  $isDarkTheme={false}
                  onClick={() => handleCategoryClick(cat.name)}
                  disabled={!isEditing}
                >
                  {cat.name}
                </Category>
              ))}
            </div>
          </CategoryWrapper>
          <TaskInfo $isDarkTheme={false}>
            <p>Статус: {status}</p>
            <p>Срок исполнения: {dueDate ? dueDate.toLocaleDateString("ru-RU") : "Не указан"}</p>
            <p>Описание: {description || "Не указано"}</p>
          </TaskInfo>
          {!isEditing ? (
            <EditButton $isDarkTheme={false} onClick={handleEdit}>Редактировать задачу</EditButton>
          ) : (
            <Button $isDarkTheme={false} type="submit">Сохранить</Button>
          )}
          <DeleteButton $isDarkTheme={false} onClick={handleDelete}>Удалить задачу</DeleteButton>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default CardDetail;