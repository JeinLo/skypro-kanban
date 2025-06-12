import { useState } from "react";
import {
  StyledNewCardPage,
  StyledTitle,
  StyledForm,
  StyledInput,
  StyledButton,
  StyledCalendar,
  StyledDay,
  StyledDateLabel,
  StyledCategoryWrapper,
  StyledCategory,
} from "./NewCardPage.styled";
import { postTask } from "../services/api";
import { useNavigate } from "react-router-dom";

function NewCardPage({ token }) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Без статуса",
  });
  const [error, setError] = useState("");

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const today = new Date().getDate();
  const categories = ["Web Design", "Research", "Copywriting"];

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
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
    if (!token) {
      setError("Требуется авторизация");
      return;
    }

    try {
      const task = {
        title: formData.title,
        description: formData.description,
        topic: selectedCategory,
        date: new Date(2025, 9, selectedDate).toISOString(),
        status: formData.status,
      };
      await postTask({ token, task });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <StyledNewCardPage>
      <StyledTitle>Добавить новую задачу</StyledTitle>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          name="title"
          placeholder="Название задачи"
          value={formData.title}
          onChange={handleChange}
        />
        <StyledInput
          type="text"
          name="description"
          placeholder="Описание задачи"
          value={formData.description}
          onChange={handleChange}
        />
        <StyledCalendar>
          {days.map((day) => (
            <StyledDay
              key={day}
              isToday={day === today}
              isSelected={day === selectedDate}
              onClick={() => handleDateClick(day)}
            >
              {day}
            </StyledDay>
          ))}
        </StyledCalendar>
        <StyledDateLabel>
          Выберите срок исполнения:{" "}
          {selectedDate ? `10.${selectedDate}.2025` : "Не выбрано"}
        </StyledDateLabel>
        <StyledCategoryWrapper>
          {categories.map((category) => (
            <StyledCategory
              key={category}
              isActive={category === selectedCategory}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </StyledCategory>
          ))}
        </StyledCategoryWrapper>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <StyledButton type="submit">Создать задачу</StyledButton>
      </StyledForm>
    </StyledNewCardPage>
  );
}

export default NewCardPage;
