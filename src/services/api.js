import axios from 'axios';

const API_URL = 'https://wedev-api.sky.pro/api/kanban/';

export async function fetchTasks({ token }) {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.data.tasks || [];
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Не удалось подключиться к серверу. Проверьте соединение.');
    }
    throw new Error(error.response?.data?.error || 'Ошибка загрузки задач');
  }
}

export async function getTask({ id, token }) {
  try {
    const response = await axios.get(`${API_URL}${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.data.task;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Не удалось подключиться к серверу. Проверьте соединение.');
    }
    throw new Error(error.response?.data?.error || 'Ошибка загрузки задачи');
  }
}

export async function postTask({ token, task }) {
  try {
    const response = await axios.post(API_URL, task, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    return response.data.tasks || [];
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Не удалось подключиться к серверу. Проверьте соединение.');
    }
    throw new Error(error.response?.data?.error || 'Ошибка создания задачи');
  }
}

export async function editTask({ id, token, task }) {
  try {
    const payload = {
      userId: task.userId,
      title: task.title,
      topic: task.topic,
      status: task.status,
      date: task.date,
      description: task.description || '',
    };
    const response = await axios.put(`${API_URL}${id}`, payload, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    return response.data.tasks || [];
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Не удалось подключиться к серверу. Проверьте соединение.');
    }
    throw new Error(error.response?.data?.error || 'Ошибка редактирования задачи');
  }
}

export async function deleteTask({ id, token }) {
  try {
    const response = await axios.delete(`${API_URL}${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.data.tasks || [];
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Не удалось подключиться к серверу. Проверьте соединение.');
    }
    if (error.response?.status === 401) {
      throw new Error('Ошибка авторизации. Пожалуйста, войдите снова.');
    }
    throw new Error(error.response?.data?.error || 'Ошибка удаления задачи');
  }
}

export async function fetchTaskById({ id, token }) {
  return getTask({ id, token });
}