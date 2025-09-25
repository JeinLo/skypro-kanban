import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { TaskContext } from './contexts/TaskContext';
import { postTask } from './services/api';
import { toast } from 'react-toastify';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import CardPage from './pages/CardPage';
import Header from './components/Header/Header';
import ExitPage from './pages/ExitPage';
import TaskModal from './components/TaskModal/TaskModal';

function AppRoutes({ onToggleTheme }) {
  const { isAuth, setIsAuth, token } = useContext(AuthContext);
  const { setTasks } = useContext(TaskContext);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const handleCreateTask = async (taskData) => {
    try {
      const updatedTasks = await postTask({ token, task: taskData });
      setTasks(updatedTasks);
      setIsTaskModalOpen(false);
      toast.success('Задача успешно создана!');
    } catch (err) {
      toast.error(err.message || 'Ошибка при создании задачи');
      throw err;
    }
  };

  return (
    <>
      {isAuth && (
        <Header
          setIsAuth={setIsAuth}
          onToggleTheme={onToggleTheme}
          token={token}
          setTasks={setTasks}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? (
              <MainPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuth ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuth ? (
              <Navigate to="/" replace />
            ) : (
              <RegisterPage />
            )
          }
        />
        <Route
          path="/cardview/:id"
          element={
            isAuth ? (
              <CardPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/createcard"
          element={
            isAuth ? (
              <TaskModal
                isOpen={true}
                onClose={() => setIsTaskModalOpen(false)}
                onCreateTask={handleCreateTask}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/exit"
          element={<ExitPage setIsAuth={setIsAuth} />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </>
  );
}

export default AppRoutes;