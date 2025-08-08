import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CardPage from "./pages/CardPage";
import NewCardPage from "./pages/NewCardPage";
import ExitPage from "./pages/ExitPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./PrivateRoute";
import Layout from "./components/Layout";

function AppRoutes({ isAuth, setIsAuth, token, setToken, theme, onToggleTheme }) {
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

  return (
    <Routes>
      <Route element={<PrivateRoute isAuth={isAuth} />}>
        <Route
          element={<Layout setIsAuth={setIsAuth} theme={theme} onToggleTheme={onToggleTheme} />}
        >
          <Route
            path="/"
            element={<MainPage loading={loading} token={token} theme={theme} />}
          />
          <Route
            path="/card/add"
            element={<NewCardPage token={token} theme={theme} />}
          />
          <Route
            path="/card/:id"
            element={<CardPage token={token} theme={theme} />}
          />
          <Route
            path="/exit"
            element={<ExitPage setIsAuth={setIsAuth} theme={theme} />}
          />
        </Route>
      </Route>
      <Route
        path="/login"
        element={<LoginPage setIsAuth={setIsAuth} setToken={setToken} theme={theme} />}
      />
      <Route
        path="/register"
        element={<RegisterPage setIsAuth={setIsAuth} setToken={setToken} theme={theme} />}
      />
      <Route
        path="*"
        element={<NotFoundPage theme={theme} />}
      />
    </Routes>
  );
}

export default AppRoutes;