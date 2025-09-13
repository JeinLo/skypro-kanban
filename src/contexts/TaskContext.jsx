import { createContext, useState, useEffect, useContext } from 'react';
import { fetchTasks } from '../services/api';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      setLoading(true);
      fetchTasks({ token })
        .then((data) => {
          setTasks(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          toast.error(err.message || 'Ошибка загрузки задач');
        })
        .finally(() => setLoading(false));
    }
  }, [token]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, loading, error }}>
      {children}
    </TaskContext.Provider>
  );
};