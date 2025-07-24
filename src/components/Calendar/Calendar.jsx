import React, { useState } from "react";
import {
  StyledCalendar,
  CalendarTitle,
  CalendarBlock,
  CalendarNav,
  CalendarMonth,
  NavActions,
  NavAction,
  CalendarWeek,
  DayName,
  CalendarCells,
  CalendarCell,
  CalendarPeriod,
  DateControl,
} from "./Calendar.styled";

function Calendar({ isBrowse, onDateSelect }) {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 8)); // Сентябрь 2023
  const [selectedDate, setSelectedDate] = useState(null);

  const daysOfWeek = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
  const daysInMonth = 30; // Для сентября 2023
  const firstDayOfMonth = new Date(2023, 8, 1).getDay();
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Смещение для начала месяца
  const days = [
    ...Array(startOffset).fill(null), // Пустые ячейки до начала месяца
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ...Array(35 - (startOffset + daysInMonth)).fill(null), // Пустые ячейки после
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day) => {
    if (day) {
      setSelectedDate(day);
      if (onDateSelect) {
        onDateSelect(new Date(2023, 8, day).toISOString());
      }
    }
  };

  return (
    <StyledCalendar>
      <CalendarTitle>Даты</CalendarTitle>
      <CalendarBlock>
        <CalendarNav>
          <CalendarMonth>
            {currentDate.toLocaleString("ru-RU", { month: "long", year: "numeric" })}
          </CalendarMonth>
          <NavActions>
            <NavAction data-action="prev" onClick={handlePrevMonth}>
              ←
            </NavAction>
            <NavAction data-action="next" onClick={handleNextMonth}>
              →
            </NavAction>
          </NavActions>
        </CalendarNav>
        <CalendarWeek>
          {daysOfWeek.map((day, index) => (
            <DayName key={index} isWeekend={index >= 5}>
              {day}
            </DayName>
          ))}
        </CalendarWeek>
        <CalendarCells>
          {days.map((day, index) => (
            <CalendarCell
              key={index}
              isOtherMonth={!day}
              isWeekend={index % 7 >= 5}
              isSelected={day === selectedDate}
              onClick={() => handleDateClick(day)}
            >
              {day || ""}
            </CalendarCell>
          ))}
        </CalendarCells>
        <CalendarPeriod>
          {isBrowse ? (
            <p>
              Срок исполнения: <DateControl>{selectedDate ? `09.${selectedDate}.2023` : "Не выбрано"}</DateControl>
            </p>
          ) : (
            <p>
              Выберите срок исполнения: <DateControl>{selectedDate ? `09.${selectedDate}.2023` : "Не выбрано"}</DateControl>
            </p>
          )}
        </CalendarPeriod>
      </CalendarBlock>
    </StyledCalendar>
  );
}

export default Calendar;