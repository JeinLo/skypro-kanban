import styled from 'styled-components';

export const ColumnStyled = styled.div`
  width: 250px;
  background-color: ${({ theme }) => theme.background};
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: background-color 0.3s;
  ${({ $isDraggingOver, theme }) =>
    $isDraggingOver &&
    `
    background-color: ${theme.secondary}33;
  `}
`;

export const ColumnTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin: 0 0 10px 0;
`;