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

function Calendar({ value, onChange = () => {}, $isDarkTheme, disabled }) {
  const [currentDate, setCurrentDate] = useState(() =>
    value ? new Date(value) : new Date()
  );
  const [hoveredDay, setHoveredDay] = useState(null);

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

  const today = new Date();

  const prevMonth = () => {
    if (!disabled) {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
      );
    }
  };

  const nextMonth = () => {
    if (!disabled) {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
      );
    }
  };

  const handleDayClick = (day) => {
    if (!disabled && day) onChange(day);
  };

  const handleDayHover = (day) => {
    if (!disabled) setHoveredDay(day);
  };

  const handleMouseLeave = () => {
    if (!disabled) setHoveredDay(null);
  };

  return (
    <CalendarWrapper $isDarkTheme={$isDarkTheme}>
      <CalendarHeader>
        <MonthYear $isDarkTheme={$isDarkTheme}>
          {currentDate.toLocaleString("ru-RU", {
            month: "long",
            year: "numeric",
          }).replace(/^./, (str) => str.toUpperCase())}
          <div style={{ display: "flex", gap: "5px", marginLeft: "10px", alignItems: "center" }}>
            <Button
              $isDarkTheme={$isDarkTheme}
              onClick={nextMonth}
              aria-label="Следующий месяц"
              disabled={disabled}
            >
              <svg
                width="6"
                height="11"
                viewBox="0 0 6 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z"
                  fill="#94A6BE"
                />
              </svg>
            </Button>
            <Button
              $isDarkTheme={$isDarkTheme}
              onClick={prevMonth}
              aria-label="Предыдущий месяц"
              disabled={disabled}
            >
              <svg
                width="6"
                height="11"
                viewBox="0 0 6 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z"
                  fill="#94A6BE"
                />
              </svg>
            </Button>
          </div>
        </MonthYear>
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
              $isHovered={isSameDay(day, hoveredDay)}
              $isDarkTheme={$isDarkTheme}
              onClick={() => handleDayClick(day)}
              onMouseEnter={() => handleDayHover(day)}
              onMouseLeave={handleMouseLeave}
              tabIndex={disabled ? -1 : 0}
              onKeyDown={(e) => {
                if (!disabled && (e.key === "Enter" || e.key === " ")) {
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