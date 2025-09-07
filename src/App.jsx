import { useState } from "react";
import AppRoutes from "./AppRoutes";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [theme, setTheme] = useState("light");
  const [tasks, setTasks] = useState([]);

  return (
    <AppRoutes
      isAuth={isAuth}
      setIsAuth={setIsAuth}
      token={token}
      setToken={setToken}
      theme={theme}
      onToggleTheme={setTheme}
      tasks={tasks}
      setTasks={setTasks}
    />
  );
}

export default App;