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
import { fetchTasks, postTask } from "./services/api";

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
          setTasks(tasksData);
        })
        .catch((err) => {
          console.error("Ошибка загрузки задач:", err.message);
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
                <MainPage
                  loading={loading}
                  token={token}
                  theme={theme}
                  tasks={tasks}
                  setTasks={setTasks}
                />
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
                  onCreateTask={(task) =>
                    postTask({ token, task }).then((newTasks) => {
                      setTasks(newTasks);
                      window.history.back();
                    })
                  }
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