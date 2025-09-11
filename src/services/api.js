import axios from "axios";

const API_URL = "https://wedev-api.sky.pro/api/kanban/";

export async function fetchTasks({ token }) {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("Ответ fetchTasks:", response.data);
    return response.data.tasks || [];
  } catch (error) {
    console.error("Ошибка fetchTasks:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || error.message);
  }
}

export async function getTask({ id, token }) {
  try {
    const response = await axios.get(`${API_URL}${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("Ответ getTask:", response.data);
    return response.data.task;
  } catch (error) {
    console.error("Ошибка getTask:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || error.message);
  }
}

export async function postTask({ token, task }) {
  try {
    const response = await axios.post(API_URL, task, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "", // Пустой Content-Type, как в исходном коде
      },
    });
    console.log("Ответ postTask:", response.data);
    return response.data.tasks || [];
  } catch (error) {
    console.error("Ошибка postTask:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || error.message);
  }
}

export async function editTask({ id, token, task }) {
  try {
    const payload = {
      userId: task.userId,
      title: task.title,
      topic: task.topic, // Включаем topic для сохранения категории
      status: task.status,
      date: task.date,
      description: task.description || "",
    };
    console.log("Отправляемые данные в editTask:", { id, payload });

    const response = await axios.put(`${API_URL}${id}`, payload, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "", // Убираем Content-Type, как требует API
      },
    });
    console.log("Ответ editTask:", response.data);
    return response.data.tasks || [];
  } catch (error) {
    console.error("Ошибка editTask:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || error.message);
  }
}

export async function deleteTask({ id, token }) {
  try {
    console.log("Отправляемые данные в deleteTask:", { id, token });
    const response = await axios.delete(`${API_URL}${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("Ответ deleteTask:", response.data);
    return response.data.tasks || [];
  } catch (error) {
    console.error("Ошибка deleteTask:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      throw new Error("Ошибка авторизации. Пожалуйста, войдите снова.");
    }
    throw new Error(error.response?.data?.error || error.message);
  }
}

export async function fetchTaskById({ id, token }) {
  return getTask({ id, token });
}