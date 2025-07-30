import styled from "styled-components";

export const CalendarWrapper = styled.div`
  width: 100%;
  user-select: none;
  margin-bottom: 16px;
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
  font-size: 18px;
  cursor: pointer;
  user-select: none;

  &:hover {
    color: #565eef;
  }

  &:focus {
    outline: 2px solid #565eef;
  }
`;

export const MonthYear = styled.div`
  font-weight: 600;
  font-size: 16px;
`;

export const DaysOfWeek = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

export const DaysOfWeekItem = styled.div`
  width: 32px;
  text-align: center;
`;

export const DaysGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Day = styled.div`
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;

  ${({ isToday }) =>
    isToday &&
    `
    border: 1px solid #565eef;
  `}

  ${({ isSelected }) =>
    isSelected &&
    `
    background-color: #565eef;
    color: white;
  `}

  &:hover {
    background-color: #c6c8ff;
  }

  &:focus {
    outline: 2px solid #565eef;
  }
`;

export const EmptyDay = styled.div`
  width: 32px;
  height: 32px;
`;
