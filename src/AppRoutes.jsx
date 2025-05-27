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

function AppRoutes() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <Routes>
      <Route element={<PrivateRoute isAuth={isAuth} />}>
        <Route path="/" element={<MainPage loading={loading} />} />
        <Route path="/card/add" element={<NewCardPage />} />
        <Route path="/card/:id" element={<CardPage />} />
        <Route path="/exit" element={<ExitPage setIsAuth={setIsAuth} />} />
      </Route>
      <Route path="/login" element={<LoginPage setIsAuth={setIsAuth} />} />
      <Route
        path="/register"
        element={<RegisterPage setIsAuth={setIsAuth} />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
