import axios from "axios";

const API_URL = "https://wedev-api.sky.pro/api/user";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("isAuth");
      localStorage.removeItem("userInfo");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export async function signIn({ login, password }) {
  try {
    console.log("Отправляемый запрос signIn:", { login, password });
    const response = await axios.post(
      `${API_URL}/login`,
      { login, password },
      {
        headers: {
          "Content-Type": "", // Пустой Content-Type для совместимости с API
        },
      }
    );
    console.log("Ответ signIn:", response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка signIn:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || error.message);
  }
}

export async function signUp({ name, login, password }) {
  try {
    console.log("Отправляемый запрос signUp:", { name, login, password });
    const response = await axios.post(
      API_URL,
      { name, login, password },
      {
        headers: {
          "Content-Type": "", // Пустой Content-Type для совместимости с API
        },
      }
    );
    console.log("Ответ signUp:", response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка signUp:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || error.message);
  }
}