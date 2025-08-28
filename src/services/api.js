import axios from "axios";

const API_URL = "https://wedev-api.sky.pro/api/kanban/";

// Глобальная настройка Axios для предотвращения добавления Content-Type
axios.defaults.headers.put["Content-Type"] = ""; // Отключаем Content-Type для PUT-запросов
axios.defaults.headers.post["Content-Type"] = ""; // Отключаем для POST, на всякий случай

// Получение списка задач
export async function fetchTasks({ token }) {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data.tasks;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Получение задачи по ID
export async function getTask({ id, token }) {
  try {
    const response = await axios.get(`${API_URL}${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data.task;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Добавление новой задачи
export async function postTask({ token, task }) {
  try {
    const response = await axios.post(API_URL, task, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data.tasks;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Редактирование задачи
export async function editTask({ id, token, task }) {
  try {
    const payload = {
      userId: task.userId,
      title: task.title,
      status: task.status,
      date: task.date,
      description: task.description || "",
    };
    console.log("Отправляемые данные в editTask:", { id, payload });

    const response = await axios.put(`${API_URL}${id}`, payload, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data.tasks;
  } catch (error) {
    console.error("Ошибка при редактировании задачи:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || error.message);
  }
}

// Удаление задачи
export async function deleteTask({ id, token }) {
  try {
    console.log("Отправляемые данные в deleteTask:", { id, token });
    const response = await axios.delete(`${API_URL}${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data.tasks;
  } catch (error) {
    console.error("Ошибка при удалении задачи:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      throw new Error("Ошибка авторизации. Пожалуйста, войдите снова.");
    }
    throw new Error(error.response?.data?.error || error.message);
  }
}

// Добавляем fetchTaskById как синоним getTask для совместимости
export async function fetchTaskById({ id, token }) {
  return getTask({ id, token });
}