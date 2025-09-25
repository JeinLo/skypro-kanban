import styled from "styled-components";

export const CalendarWrapper = styled.div`
  width: 200px;
  user-select: none;
  margin: 0;
  font-family: "Roboto", sans-serif;
  color: ${props => props.theme.secondary};
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
`;

export const Button = styled.button`
  background: transparent;
  border: none;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  color: ${props => props.theme.secondary};
  font-family: "Roboto", sans-serif;

  &:hover:not(:disabled) {
    color: ${props => props.theme.primary};
  }

  &:focus:not(:disabled) {
    outline: 2px solid ${props => props.theme.primary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  svg {
    vertical-align: middle;
  }
`;

export const MonthYear = styled.div`
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 14px;
  color: ${props => props.theme.secondary};
  user-select: none;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const DaysOfWeek = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 11px;
  color: ${props => props.theme.secondary};
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
  vertical-align: middle;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 10px;
  letter-spacing: -2%;
  color: ${props => props.theme.secondary};

  ${({ $isToday }) =>
    $isToday &&
    `
    font-weight: bold;
  `}

  ${({ $isSelected }) =>
    $isSelected &&
    `
    background-color: ${props => props.theme.secondary};
    color: ${props => props.theme.text};
  `}

  ${({ $isHovered }) =>
    $isHovered &&
    `
    background-color: ${props => props.theme.secondary};
    color: ${props => props.theme.text};
  `}

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.secondary};
    color: ${props => props.theme.text};
  }

  &:focus:not(:disabled) {
    outline: 2px solid ${props => props.theme.primary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const EmptyDay = styled.div`
  width: 28px;
  height: 28px;
`;