import { useContext } from "react";
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
import { AuthContext } from "./contexts/AuthContext";
import { TaskContext } from "./contexts/TaskContext";
import { postTask } from "./services/api";

function AppRoutes({ theme, onToggleTheme }) {
  const { isAuth, setIsAuth, token, setToken } = useContext(AuthContext);
  const { tasks, setTasks, loading } = useContext(TaskContext);

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
                <MainPage theme={theme} />
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
                      setTasks(newTasks);
                      return { success: true };
                    } catch (err) {
                      console.error("Ошибка создания задачи:", err.message);
                      throw new Error(err.message || "Ошибка при создании задачи");
                    }
                  }}
                  theme={theme}
                />
              }
            />
            <Route
              path="cardview/:id"
              element={<CardPage theme={theme} />}
            />
            <Route
              path="exit"
              element={<ExitPage theme={theme} />}
            />
          </Route>
        </Route>
      </Route>
      <Route
        path="/login"
        element={<LoginPage theme={theme} />}
      />
      <Route
        path="/register"
        element={<RegisterPage theme={theme} />}
      />
      <Route path="*" element={<NotFoundPage theme={theme} />} />
    </Routes>
  );
}

export default AppRoutes;