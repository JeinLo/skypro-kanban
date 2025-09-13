import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import AppRoutes from './AppRoutes';
import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import GlobalStyle from './styles/GlobalStyles';
import { Wrapper } from './styles/Global.styled';

const lightTheme = {
  background: '#EAEEF6',
  text: '#000000',
  secondary: '#94A6BE',
  primary: '#565EEF',
  primaryHover: '#3f53d8',
  modalBackground: '#ffffff',
  modalBorder: '#ccc',
  error: 'red',
};

const darkTheme = {
  background: '#1a1a1a',
  text: '#ffffff',
  secondary: '#b0b0b0',
  primary: '#565EEF',
  primaryHover: '#3f53d8',
  modalBackground: '#2a2a2a',
  modalBorder: '#333',
  error: '#ff6666',
};

function App() {
  const [theme, setTheme] = useState('light');
  const themeConfig = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={themeConfig}>
      <AuthProvider>
        <TaskProvider>
          <GlobalStyle />
          <Wrapper>
            <AppRoutes theme={theme} onToggleTheme={setTheme} />
          </Wrapper>
        </TaskProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;