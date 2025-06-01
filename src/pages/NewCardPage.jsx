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

function NewCardPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Мок для календаря (октябрь 2025)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const today = 8; // Сегодня 8.10.2025 (для примера)

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const categories = ["Работа", "Личное", "Учёба"];

  return (
    <StyledNewCardPage>
      <StyledTitle>Добавить новую задачу</StyledTitle>
      <StyledForm>
        <StyledInput type="text" placeholder="Название задачи" />
        <StyledInput type="text" placeholder="Описание задачи" />
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
        <StyledButton type="submit">Создать задачу</StyledButton>
      </StyledForm>
    </StyledNewCardPage>
  );
}

export default NewCardPage;
