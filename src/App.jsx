import { useState } from "react";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { TaskProvider } from "./contexts/TaskContext";
import GlobalStyle from "./styles/GlobalStyles";

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <AuthProvider>
      <TaskProvider>
        <GlobalStyle theme={theme} />
        <AppRoutes theme={theme} onToggleTheme={setTheme} />
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;