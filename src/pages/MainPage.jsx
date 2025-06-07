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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    async function loadTasks() {
      try {
        console.log("Loading tasks with token:", token); // Логирование
        const tasks = await fetchTasks({ token });
        setTasks(tasks || []);
        setIsLoading(false);
      } catch (err) {
        console.error("Load tasks error:", err.message); // Логирование
        setError(err.message || "Ошибка загрузки задач");
        setIsLoading(false);
        if (err.message.includes("401")) {
          setError("Требуется авторизация");
        }
      }
    }

    if (token) {
      loadTasks();
    } else {
      setError("Требуется авторизация");
      setIsLoading(false);
    }
  }, [loading, token]);

  if (isLoading) return <StyledLoading>Загрузка...</StyledLoading>;
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
