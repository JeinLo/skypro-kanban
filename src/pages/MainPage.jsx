import { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchTasks } from "../services/api";

const StyledMain = styled.div`
  padding: 20px;
  flex-grow: 1;
`;

const StyledError = styled.p`
  color: red;
  text-align: center;
`;

const StyledLoading = styled.p`
  text-align: center;
`;

const StyledTaskList = styled.ul`
  list-style: none;
  padding: 0;
`;

const StyledTaskItem = styled.li`
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-radius: 4px;
`;

function MainPage({ loading, token }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (loading || !token) return;

    async function loadTasks() {
      try {
        const fetchedTasks = await fetchTasks({ token });
        setTasks(fetchedTasks || []);
      } catch (err) {
        setError(err.message || "Ошибка загрузки задач");
        if (err.message.includes("401")) {
          setError("Требуется авторизация");
        }
      }
    }

    loadTasks();
  }, [loading, token]);

  if (error) return <StyledError>{error}</StyledError>;

  return (
    <StyledMain>
      <h2>Канбан-доска</h2>
      {tasks.length === 0 ? (
        <p>Нет задач</p>
      ) : (
        <StyledTaskList>
          {tasks.map((task) => (
            <StyledTaskItem key={task._id}>{task.title}</StyledTaskItem>
          ))}
        </StyledTaskList>
      )}
    </StyledMain>
  );
}

export default MainPage;
