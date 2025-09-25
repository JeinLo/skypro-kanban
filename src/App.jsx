import { useState } from "react";
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/themes';
import GlobalStyle from './styles/GlobalStyles';
import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import AppRoutes from "./AppRoutes";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || "light");
  const themeConfig = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <AuthProvider>
      <TaskProvider>
        <ThemeProvider theme={themeConfig}>
          <GlobalStyle />
          <AppRoutes onToggleTheme={setTheme} />
        </ThemeProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;