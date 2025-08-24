import React, { useState, useEffect } from "react";
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

function CardDetail({ task, isOpen, onClose, onUpdate, onDelete, theme, token }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [category, setCategory] = useState(task.topic || null);
  const [dueDate, setDueDate] = useState(task.date ? new Date(task.date) : null);
  const [status, setStatus] = useState(task.status || "Без статуса");

  useEffect(() => {
    setTitle(task.title || "");
    setDescription(task.description || "");
    setCategory(task.topic || null);
    setDueDate(task.date ? new Date(task.date) : null);
    setStatus(task.status || "Без статуса");
  }, [task]);

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
    onUpdate({
      ...task,
      title,
      description,
      topic: category,
      date: dueDate.toISOString(),
      status,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Вы уверены, что хотите удалить задачу?")) {
      onDelete();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay $isDarkTheme={theme === "dark"} onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <ModalContent $isDarkTheme={theme === "dark"} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle $isDarkTheme={theme === "dark"}>Просмотр задачи</ModalTitle>
          <CloseButton $isDarkTheme={theme === "dark"} onClick={onClose} aria-label="Закрыть модалку">
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

export default CardDetail;