import React from 'react';
import styled from 'styled-components';

const StyledInputDate = styled.input.attrs({ type: 'date' })`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 0.7px solid ${({ theme }) => theme.secondary}66;
  background-color: ${({ theme }) => theme.modalBackground};
  color: ${({ theme }) => theme.text};
  font-family: 'Roboto', sans-serif;
  font-size: 14px;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.primary};
  }
`;

function Calendar({ value, onChange, $isDarkTheme, disabled }) {
  const formatDateForInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  };

  const handleChange = (e) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    onChange(date);
  };

  return (
    <StyledInputDate
      value={formatDateForInput(value)}
      onChange={handleChange}
      disabled={disabled}
      theme={$isDarkTheme ? 'dark' : 'light'}
    />
  );
}

export default Calendar;