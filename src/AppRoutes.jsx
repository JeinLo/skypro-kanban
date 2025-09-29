import { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CardPage from "./pages/CardPage";
import ExitPage from "./pages/ExitPage";
import TaskModal from "./components/TaskModal/TaskModal";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./PrivateRoute";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import { fetchTasks, postTask } from "./services/api";
import { toast } from 'react-toastify';

function AppRoutes({ isAuth, setIsAuth, token, setToken, theme, onToggleTheme, tasks, setTasks }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuth") === "true";
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      try {
        const parsed = JSON.parse(userInfo);
        setToken(parsed.user?.token || parsed.token);
      } catch (err) {
        console.error("Ошибка парсинга userInfo:", err);
        toast.error('Ошибка загрузки данных пользователя');
      }
    }

    setIsAuth(authStatus);
    setLoading(false);
  }, [setIsAuth, setToken]);

  useEffect(() => {
    localStorage.setItem("isAuth", String(isAuth));
  }, [isAuth]);

  useEffect(() => {
    if (token) {
      setLoading(true);
      fetchTasks({ token })
        .then((tasksData) => {
          const normalizedTasks = tasksData.map(task => ({
            ...task,
            topic: task.topic && typeof task.topic === 'string' ? task.topic : 'Без темы',
          }));
          setTasks(normalizedTasks);
        })
        .catch((err) => {
          console.error("Ошибка загрузки задач:", err.message);
          toast.error(err.message || 'Ошибка загрузки задач');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token, setTasks]);

  return (
    <Routes>
      <Route element={<PrivateRoute isAuth={isAuth} />}>
        <Route
          element={
            <Layout
              setIsAuth={setIsAuth}
              theme={theme}
              onToggleTheme={onToggleTheme}
              token={token}
              setTasks={setTasks}
            />
          }
        >
          <Route
            path="/"
            element={
              <>
                <ErrorBoundary>
                  <MainPage
                    loading={loading}
                    token={token}
                    theme={theme}
                    tasks={tasks}
                    setTasks={setTasks}
                  />
                </ErrorBoundary>
                <Outlet />
              </>
            }
          >
            <Route
              path="createcard"
              element={
                <TaskModal
                  isOpen={true}
                  onClose={() => window.history.back()}
                  onCreateTask={async (task) => {
                    try {
                      const newTasks = await postTask({ token, task });
                      const normalizedTasks = newTasks.map(t => ({
                        ...t,
                        topic: t.topic && typeof t.topic === 'string' ? t.topic : 'Без темы',
                      }));
                      setTasks(normalizedTasks);
                      toast.success('Задача успешно создана!');
                      return { success: true };
                    } catch (err) {
                      toast.error(err.message || 'Ошибка при создании задачи');
                      throw new Error(err.message || "Ошибка при создании задачи");
                    }
                  }}
                  theme={theme}
                />
              }
            />
            <Route
              path="cardview/:id"
              element={
                <CardPage
                  token={token}
                  theme={theme}
                  tasks={tasks}
                  setTasks={setTasks}
                />
              }
            />
            <Route
              path="exit"
              element={<ExitPage setIsAuth={setIsAuth} theme={theme} />}
            />
          </Route>
        </Route>
      </Route>
      <Route
        path="/login"
        element={
          <LoginPage setIsAuth={setIsAuth} setToken={setToken} theme={theme} />
        }
      />
      <Route
        path="/register"
        element={
          <RegisterPage setIsAuth={setIsAuth} setToken={setToken} theme={theme} />
        }
      />
      <Route path="*" element={<NotFoundPage theme={theme} />} />
    </Routes>
  );
}

export default AppRoutes;