import { useState } from "react";
import { ThemeProvider } from "styled-components";
import AppRoutes from "./AppRoutes";
import GlobalStyle from "./styles/GlobalStyles";
import { lightTheme, darkTheme } from "./styles/themes";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("isAuth"));
  const [token, setToken] = useState(null);
  const [theme, setTheme] = useState("light");
  const [tasks, setTasks] = useState([]);

  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle theme={theme} />
      <ErrorBoundary>
        <AppRoutes
          isAuth={isAuth}
          setIsAuth={setIsAuth}
          token={token}
          setToken={setToken}
          theme={currentTheme}
          onToggleTheme={setTheme}
          tasks={tasks}
          setTasks={setTasks}
        />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;