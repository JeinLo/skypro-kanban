import { createContext, useState, useEffect } from "react";
import { fetchTasks } from "../services/api";

export const TaskContext = createContext();

export const TaskProvider = ({ children, token }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, [token]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, loading }}>
      {children}
    </TaskContext.Provider>
  );
};