import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { toast } from 'react-toastify';

const categories = ["Web Design", "Research", "Copywriting"];

function TaskModal({ isOpen, onClose, onCreateTask, theme }) {
  console.log("TaskModal props:", { isOpen, theme, onCreateTask });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Без статуса",
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState("");
  const [isTaskCreated, setIsTaskCreated] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setError("");
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.trim(), // Используем trim() из новой версии
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !selectedCategory || !selectedDate) {
      setError("Заполните все поля: название, категория, дата");
      return;
    }
    console.log("Submitting task:", { formData, selectedCategory, selectedDate });
    try {
      await onCreateTask({
        title: formData.title,
        description: formData.description,
        topic: selectedCategory,
        date: selectedDate.toISOString(),
        status: formData.status,
      });
      toast.success('Задача успешно создана!');
      setIsTaskCreated(true);
    } catch (err) {
      toast.error(err.message || 'Ошибка при создании задачи');
      setError(err.message || "Ошибка при создании задачи!");
      console.error("Ошибка создания задачи:", err);
    }
  };

  useEffect(() => {
    if (isTaskCreated && isOpen) {
      onClose(); // Закрытие из старой версии
      setIsTaskCreated(false);
    }
  }, [isTaskCreated, isOpen, onClose]);

  if (!isOpen) {
    console.log("TaskModal не рендерится, isOpen=false");
    return null;
  }

  return (
    <ModalOverlay
      onClick={() => {
        console.log("Закрытие TaskModal через фон");
        onClose();
      }}
    >
      <ModalContent
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <ModalTitle>Создание задачи</ModalTitle>
          <CloseButton
            onClick={() => {
              console.log("Закрытие TaskModal через крестик");
              onClose();
            }}
            aria-label="Закрыть модалку"
          >
            &times;
          </CloseButton>
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "20px", flexGrow: 1 }}>
            <div style={{ flex: 1 }}>
              <InputWrapper>
                <InputLabel>Название задачи</InputLabel>
                <Input
                  type="text"
                  name="title"
                  placeholder="Название задачи"
                  value={formData.title}
                  onChange={handleChange}
                />
              </InputWrapper>
              <TextareaWrapper>
                <TextareaLabel style={{ marginTop: "20px" }}>
                  Описание задачи
                </TextareaLabel>
                <Textarea
                  name="description"
                  placeholder="Описание задачи"
                  value={formData.description}
                  onChange={handleChange}
                />
              </TextareaWrapper>
            </div>
            <CalendarWrapper>
              <CalendarLabel>Даты</CalendarLabel>
              <Calendar
                value={selectedDate}
                onChange={handleDateSelect}
              />
              <SelectedDateText>
                {selectedDate
                  ? `Срок исполнения: ${selectedDate.toLocaleDateString("ru-RU")}`
                  : "Выберите срок исполнения"}
              </SelectedDateText>
            </CalendarWrapper>
          </div>
          <CategoryWrapper>
            <InputLabel>Категории</InputLabel>
            <div style={{ display: "flex", gap: "10px" }}>
              {categories.map((cat) => (
                <Category
                  type="button"
                  key={cat}
                  $isSelected={cat === selectedCategory}
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat}
                </Category>
              ))}
            </div>
          </CategoryWrapper>
          {error && <Error>{error}</Error>}
          <Button type="submit">
            Создать задачу
          </Button>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default TaskModal;