import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyles";
import AppRoutes from "./AppRoutes";
import { useState, useEffect } from "react";
import { fetchTasks } from "./services/api";

const StyledApp = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${({ theme }) => (theme === "dark" ? "#1a1a1a" : "#ffffff")};
`;

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("isAuth"));
  const [token, setToken] = useState(localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).token : null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    document.body.style.backgroundColor = theme === "dark" ? "#1a1a1a" : "#ffffff";
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (isAuth && token) {
      fetchTasks({ token })
        .then((tasksData) => {
          const tasksWithId = tasksData.map((task, index) => ({
            ...task,
            id: task.id || `task_${index}_${Date.now()}`
          }));
          setTasks(tasksWithId);
        })
        .catch((err) => {
          console.error("Ошибка загрузки задач:", err.message);
        });
    }
  }, [isAuth, token]);

  const handleToggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <>
      <GlobalStyle theme={theme} />
      <StyledApp theme={theme}>
        <AppRoutes
          isAuth={isAuth}
          setIsAuth={setIsAuth}
          token={token}
          setToken={setToken}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          tasks={tasks}
          setTasks={setTasks}
        />
      </StyledApp>
    </>
  );
}

export default App;