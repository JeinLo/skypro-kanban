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
  Error,
} from "./TaskModal.styled";
import Calendar from "../Calendar/Calendar";

const categories = [
  { id: 1, name: "Web Design" },
  { id: 2, name: "Research" },
  { id: 3, name: "Copywriting" },
];

function TaskModal({ isOpen, onClose, onCreateTask, theme }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [error, setError] = useState("");

  const handleCategoryClick = (cat) => {
    setCategory(cat === category ? null : cat);
    setError("");
  };

  const handleDateSelect = (date) => {
    setDueDate(date);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !category || !dueDate) {
      setError("Заполните все поля: название, категория, дата");
      return;
    }
    onCreateTask({
      title,
      description,
      topic: category,
      date: dueDate.toISOString(),
      status: "Без статуса",
    });
    setTitle("");
    setDescription("");
    setCategory(null);
    setDueDate(null);
    setError("");
  };

  return (
    <ModalOverlay isOpen={isOpen} $isDarkTheme={theme === "dark"} onClick={(e) => {
      if (e.target === e.currentTarget) {onClose ()}
    }}>
      <ModalContent $isDarkTheme={theme === "dark"} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle $isDarkTheme={theme === "dark"}>Создание задачи</ModalTitle>
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
                  placeholder="Введите название задачи..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </InputWrapper>
              <TextareaWrapper>
                <TextareaLabel $isDarkTheme={theme === "dark"} style={{ marginTop: "20px" }}>Описание задачи</TextareaLabel>
                <Textarea
                  $isDarkTheme={theme === "dark"}
                  placeholder="Введите описание задачи..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </TextareaWrapper>
            </div>
            <CalendarWrapper>
              <CalendarLabel $isDarkTheme={theme === "dark"}>Даты</CalendarLabel>
              <Calendar value={dueDate} onChange={handleDateSelect} $isDarkTheme={theme === "dark"} />
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
                  type="button"
                  key={cat.id}
                  $isActive={cat.name === category}
                  $isDarkTheme={theme === "dark"}
                  onClick={(e) => 
                     {e.stopPropagation()
                   handleCategoryClick(cat.name)}}
                >
                  {cat.name}
                </Category>
              ))}
            </div>
          </CategoryWrapper>
          {error && <Error $isDarkTheme={theme === "dark"}>{error}</Error>}
          <Button $isDarkTheme={theme === "dark"} type="submit">Создать задачу</Button>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default TaskModal;