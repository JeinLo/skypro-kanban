import styled from "styled-components";

export const StyledCalendar = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const CalendarTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 15px;
`;

export const CalendarBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CalendarNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const CalendarMonth = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333333;
`;

export const NavActions = styled.div`
  display: flex;
  gap: 10px;
`;

export const NavAction = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  color: #565eef;

  &:hover {
    color: #33399b;
    background-color: #e6e8ff;
    border-radius: 50%;
  }
`;

export const CalendarWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 10px;
`;

export const DayName = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ isWeekend }) => (isWeekend ? "#ff6d00" : "#94a6be")};
  text-align: center;
`;

export const CalendarCells = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

export const CalendarCell = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${({ isOtherMonth, isSelected }) => (isSelected ? "#ffffff" : isOtherMonth ? "#94a6be" : "#000000")};
  background-color: ${({ isSelected }) => (isSelected ? "#565eef" : "transparent")};
  cursor: ${({ isOtherMonth }) => (isOtherMonth ? "default" : "pointer")};
  border-radius: 50%;

  &:hover:not([isOtherMonth]) {
    background-color: #e6e8ff;
  }
`;

export const CalendarPeriod = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #000000;
`;

export const DateControl = styled.span`
  font-weight: 500;
  color: #565eef;
`;