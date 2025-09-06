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

function TaskModal({ isOpen, onClose, onCreateTask, theme }) {
  console.log("TaskModal props:", { isOpen, theme, onCreateTask }); // Отладка
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Без статуса",
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState("");
  const [isTaskCreated, setIsTaskCreated] = useState(false); // Состояние успешного создания
  const navigate = useNavigate();

  // Обработка выбора даты
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setError("");
  };

  // Обработка выбора категории
  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setError("");
  };

  // Обработка изменений в полях формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
  };

  // Обработка отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !selectedCategory || !selectedDate) {
      setError("Заполните все поля: название, категория, дата");
      return;
    }
    console.log("Submitting task:", { formData, selectedCategory, selectedDate }); // Отладка
    try {
      await onCreateTask({
        title: formData.title,
        description: formData.description,
        topic: selectedCategory,
        date: selectedDate.toISOString(),
        status: formData.status,
      });
      setIsTaskCreated(true); // Устанавливаем флаг успеха
    } catch (err) {
      setError(err.message || "Ошибка при создании задачи!");
      console.error("Ошибка создания задачи:", err);
    }
  };

  // Эффект для закрытия модалки при успешном создании
  useEffect(() => {
    if (isTaskCreated && isOpen) {
      onClose(); // Закрываем модальное окно только при успехе и если оно открыто
      setIsTaskCreated(false); // Сбрасываем флаг после закрытия
    }
  }, [isTaskCreated, isOpen, onClose]);

  if (!isOpen) {
    console.log("TaskModal не рендерится, isOpen=false");
    return null;
  }

  return (
    <ModalOverlay
      $isDarkTheme={theme === "dark"}
      onClick={() => {
        console.log("Закрытие TaskModal через фон");
        onClose(); // Закрытие через клик вне модального окна без navigate
      }}
    >
      <ModalContent
        $isDarkTheme={theme === "dark"}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <ModalTitle $isDarkTheme={theme === "dark"}>Создание задачи</ModalTitle>
          <CloseButton
            $isDarkTheme={theme === "dark"}
            onClick={() => {
              console.log("Закрытие TaskModal через крестик");
              onClose(); // Закрытие через крестик без navigate
            }}
            aria-label="Закрыть модалку"
          >
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
                  name="title"
                  placeholder="Название задачи"
                  value={formData.title}
                  onChange={handleChange}
                />
              </InputWrapper>
              <TextareaWrapper>
                <TextareaLabel $isDarkTheme={theme === "dark"} style={{ marginTop: "20px" }}>
                  Описание задачи
                </TextareaLabel>
                <Textarea
                  $isDarkTheme={theme === "dark"}
                  name="description"
                  placeholder="Описание задачи"
                  value={formData.description}
                  onChange={handleChange}
                />
              </TextareaWrapper>
            </div>
            <CalendarWrapper>
              <CalendarLabel $isDarkTheme={theme === "dark"}>Даты</CalendarLabel>
              <Calendar
                value={selectedDate}
                onChange={handleDateSelect}
                $isDarkTheme={theme === "dark"}
              />
              <SelectedDateText $isDarkTheme={theme === "dark"}>
                {selectedDate
                  ? `Срок исполнения: ${selectedDate.toLocaleDateString("ru-RU")}`
                  : "Выберите срок исполнения"}
              </SelectedDateText>
            </CalendarWrapper>
          </div>
          <CategoryWrapper>
            <InputLabel $isDarkTheme={theme === "dark"}>Категории</InputLabel>
            <div style={{ display: "flex", gap: "10px" }}>
              {categories.map((cat) => (
                <Category
                  type="button"
                  key={cat}
                  $isActive={cat === selectedCategory}
                  $isDarkTheme={theme === "dark"}
                  onClick={() => handleCategoryClick(cat)}
                  $isSelected={cat === selectedCategory} // Управление состоянием
                >
                  {cat}
                </Category>
              ))}
            </div>
          </CategoryWrapper>
          {error && <Error $isDarkTheme={theme === "dark"}>{error}</Error>}
          <Button $isDarkTheme={theme === "dark"} type="submit">
            Создать задачу
          </Button>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default TaskModal;