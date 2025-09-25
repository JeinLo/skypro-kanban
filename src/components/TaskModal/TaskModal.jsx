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

const categories = ["Web Design", "Research", "Copywriting"];

function TaskModal({ isOpen, onClose, onCreateTask }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Без статуса",
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState("");
  const [isTaskCreated, setIsTaskCreated] = useState(false);
  const navigate = useNavigate();

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
      [name]: value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !selectedCategory || !selectedDate) {
      setError("Заполните все поля: название, категория, дата");
      return;
    }
    try {
      await onCreateTask({
        title: formData.title,
        description: formData.description,
        topic: selectedCategory,
        date: selectedDate.toISOString(),
        status: formData.status,
      });
      setIsTaskCreated(true);
    } catch (err) {
      setError(err.message || "Ошибка при создании задачи!");
    }
  };

  useEffect(() => {
    if (isTaskCreated && isOpen) {
      onClose();
      setIsTaskCreated(false);
    }
  }, [isTaskCreated, isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ModalOverlay
      onClick={() => onClose()}
    >
      <ModalContent
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <ModalTitle>Создание задачи</ModalTitle>
          <CloseButton
            onClick={() => onClose()}
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