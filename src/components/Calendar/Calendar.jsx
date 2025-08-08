import React, { useState, useEffect } from "react";
import {
  CalendarWrapper,
  CalendarHeader,
  Button,
  MonthYear,
  DaysOfWeek,
  Day,
  DaysOfWeekItem,
  DaysGrid,
  EmptyDay,
} from "./Calendar.styled";

const daysOfWeek = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

function Calendar({ value, onChange = () => {}, $isDarkTheme }) {
  const [currentDate, setCurrentDate] = useState(() =>
    value ? new Date(value) : new Date()
  );

  useEffect(() => {
    if (value) {
      setCurrentDate(new Date(value));
    }
  }, [value]);

  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const startDay = (startOfMonth.getDay() + 6) % 7; // Понедельник = 0
  const daysInMonth = endOfMonth.getDate();

  const days = [];

  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  }

  const isSameDay = (d1, d2) =>
    d1 &&
    d2 &&
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const today = new Date(); // 04:10 PM EDT, 08.08.2025

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDayClick = (day) => {
    if (day) onChange(day);
  };

  return (
    <CalendarWrapper $isDarkTheme={$isDarkTheme}>
      <CalendarHeader>
        <Button $isDarkTheme={$isDarkTheme} onClick={prevMonth} aria-label="Предыдущий месяц">
          ←
        </Button>
        <MonthYear $isDarkTheme={$isDarkTheme}>
          {currentDate.toLocaleString("ru-RU", {
            month: "long",
            year: "numeric",
          }).replace(/^./, (str) => str.toUpperCase())}
        </MonthYear>
        <Button $isDarkTheme={$isDarkTheme} onClick={nextMonth} aria-label="Следующий месяц">
          →
        </Button>
      </CalendarHeader>

      <DaysOfWeek>
        {daysOfWeek.map((day) => (
          <DaysOfWeekItem key={day} $isDarkTheme={$isDarkTheme}>
            {day}
          </DaysOfWeekItem>
        ))}
      </DaysOfWeek>

      <DaysGrid>
        {days.map((day, i) =>
          day ? (
            <Day
              key={i}
              $isToday={isSameDay(day, today)}
              $isSelected={isSameDay(day, value)}
              $isDarkTheme={$isDarkTheme}
              onClick={() => handleDayClick(day)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleDayClick(day);
                }
              }}
              aria-label={`Выбрать ${day.toLocaleDateString("ru-RU")}`}
              role="button"
            >
              {day.getDate()}
            </Day>
          ) : (
            <EmptyDay key={i} />
          )
        )}
      </DaysGrid>
    </CalendarWrapper>
  );
}

export default Calendar;