import { createContext, useState, useEffect, useContext } from "react";
import { fetchTasks } from "../services/api";
import { AuthContext } from "./AuthContext";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { token, setIsAuth } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // Добавляем состояние для ошибок

  useEffect(() => {
    let timeoutId;

    if (token) {
      setLoading(true);
      setError(""); // Сбрасываем ошибку перед новым запросом

      // Устанавливаем таймаут на 10 секунд
      timeoutId = setTimeout(() => {
        setError("Превышено время ожидания загрузки задач. Проверьте соединение с сервером.");
        setLoading(false);
      }, 10000);

      fetchTasks({ token })
        .then((tasksData) => {
          clearTimeout(timeoutId); // Отменяем таймаут при успешном запросе
          setTasks(tasksData || []);
        })
        .catch((err) => {
          clearTimeout(timeoutId); // Отменяем таймаут при ошибке
          console.error("Ошибка загрузки задач:", err.message);
          if (err.message.includes("401")) {
            setError("Ошибка авторизации. Пожалуйста, войдите снова.");
            setIsAuth(false);
            localStorage.removeItem("isAuth");
            localStorage.removeItem("userInfo");
          } else {
            setError(err.message || "Ошибка загрузки задач. Попробуйте позже.");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setTasks([]);
      setLoading(false);
      setError("");
    }

    return () => clearTimeout(timeoutId); // Очистка таймаута при размонтировании
  }, [token, setIsAuth]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, loading, error }}>
      {children}
    </TaskContext.Provider>
  );
};