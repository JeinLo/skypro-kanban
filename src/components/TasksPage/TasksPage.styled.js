import styled from "styled-components";

export const PageWrapper = styled.div`
  padding: 24px;
  font-family: Arial, sans-serif;
`;

export const Title = styled.h1`
  margin-bottom: 20px;
`;

export const CreateButton = styled.button`
  background-color: #565eef;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 20px;

  &:hover {
    background-color: #3a3fcf;
  }
`;

export const TaskList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const TaskItem = styled.li`
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
`;
