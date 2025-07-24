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

function AppRoutes() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuth") === "true";
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      try {
        const parsed = JSON.parse(userInfo);
        setToken(parsed.user?.token || parsed.token);
      } catch (err) {
        console.error("Parse userInfo error:", err);
      }
    }

    setIsAuth(authStatus);
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("isAuth", String(isAuth));
  }, [isAuth]);

  return (
    <Routes>
      <Route element={<PrivateRoute isAuth={isAuth} />}>
        <Route element={<Layout setIsAuth={setIsAuth} />}>
          <Route
            path="/"
            element={<MainPage loading={loading} token={token} />}
          />
          <Route path="/card/add" element={<NewCardPage token={token} />} />
          <Route path="/card/:id" element={<CardPage token={token} />} />
          <Route path="/exit" element={<ExitPage setIsAuth={setIsAuth} />} />
        </Route>
      </Route>
      <Route
        path="/login"
        element={<LoginPage setIsAuth={setIsAuth} setToken={setToken} />}
      />
      <Route
        path="/register"
        element={<RegisterPage setIsAuth={setIsAuth} setToken={setToken} />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;