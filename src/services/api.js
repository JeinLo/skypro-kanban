import axios from "axios";

const API_URL = "https://wedev-api.sky.pro/api/kanban";

export async function fetchTasks({ token }) {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("fetchTasks response:", response.data);
    return response.data.tasks;
  } catch (error) {
    console.error(
      "fetchTasks error:",
      error.response?.data?.error || error.message
    );
    throw new Error(error.response?.data?.error || error.message);
  }
}

export async function fetchTaskById({ token, id }) {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("fetchTaskById response:", response.data);
    return response.data.task;
  } catch (error) {
    console.error(
      "fetchTaskById error:",
      error.response?.data?.error || error.message
    );
    throw new Error(error.response?.data?.error || error.message);
  }
}

export async function postTask({ token, task }) {
  try {
    const response = await axios.post(API_URL, task, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("postTask response:", response.data);
    return response.data.tasks;
  } catch (error) {
    console.error(
      "postTask error:",
      error.response?.data?.error || error.message
    );
    throw new Error(error.response?.data?.error || error.message);
  }
}

export async function editTask({ token, task, id }) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, task, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("editTask response:", response.data);
    return response.data.tasks;
  } catch (error) {
    console.error(
      "editTask error:",
      error.response?.data?.error || error.message
    );
    throw new Error(error.response?.data?.error || error.message);
  }
}

export async function deleteTask({ token, id }) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("deleteTask response:", response.data);
    return response.data.tasks;
  } catch (error) {
    console.error(
      "deleteTask error:",
      error.response?.data?.error || error.message
    );
    throw new Error(error.response?.data?.error || error.message);
  }
}
