import styled from "styled-components";

export const CalendarWrapper = styled.div`
  width: 200px;
  user-select: none;
  margin: 0;
  font-family: "Roboto", sans-serif;
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#b0b0b0" : "#94A6BE")};
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const Button = styled.button`
  background: transparent;
  border: none;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#b0b0b0" : "#94A6BE")};
  font-family: "Roboto", sans-serif;

  &:hover {
    color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#3f53d8" : "#565eef")};
  }

  &:focus {
    outline: 2px solid ${({ $isDarkTheme }) => ($isDarkTheme ? "#3f53d8" : "#565eef")};
  }
`;

export const MonthYear = styled.div`
  font-weight: 600;
  font-size: 14px;
  user-select: none;
  min-width: 90px;
  text-align: center;
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#ffffff" : "#000000")};
  font-family: "Roboto", sans-serif;
`;

export const DaysOfWeek = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 11px;
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#b0b0b0" : "#94A6BE")};
  margin-bottom: 6px;
  font-family: "Roboto", sans-serif;
`;

export const DaysOfWeekItem = styled.div`
  width: 28px;
  text-align: center;
  user-select: none;
`;

export const DaysGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Day = styled.div`
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
  font-size: 12px;
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#b0b0b0" : "#94A6BE")};
  font-family: "Roboto", sans-serif;

  ${({ $isToday }) =>
    $isToday &&
    `
    font-weight: bold;
  `}

  ${({ $isSelected }) =>
    $isSelected &&
    `
    background-color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#3f53d8" : "#565eef")};
    color: #ffffff;
  `}

  &:hover {
    background-color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#2a2a2a" : "#EAEEF6")};
  }

  &:focus {
    outline: 2px solid ${({ $isDarkTheme }) => ($isDarkTheme ? "#3f53d8" : "#565eef")};
  }
`;

export const EmptyDay = styled.div`
  width: 28px;
  height: 28px;
`;