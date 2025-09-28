import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
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
  const navigate = useNavigate();

  const handleCreateTask = async (taskData) => {
    try {
      const updatedTasks = await postTask({ token, task: taskData });
      setTasks(updatedTasks);
      toast.success('Задача успешно создана!');
      navigate('/'); // Перенаправляем на главную после создания
    } catch (err) {
      toast.error(err.message || 'Ошибка при создания задачи');
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
          element={isAuth ? <MainPage /> : <Navigate to="/login" replace />}
        >
          <Route
            path="createcard"
            element={
              isAuth ? (
                <TaskModal onCreateTask={handleCreateTask} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="cardview/:id"
            element={
              isAuth ? <CardPage /> : <Navigate to="/login" replace />
            }
          />
        </Route>
        <Route
          path="/login"
          element={
            isAuth ? <Navigate to="/" replace /> : <LoginPage />
          }
        />
        <Route
          path="/register"
          element={
            isAuth ? <Navigate to="/" replace /> : <RegisterPage />
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