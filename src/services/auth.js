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
    const response = await axios.post(
      `${API_URL}/login`,
      { login, password },
      {
        headers: {
          "Content-Type": "",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
}

export async function signUp({ name, login, password }) {
  try {
    const response = await axios.post(
      API_URL,
      { name, login, password },
      {
        headers: {
          "Content-Type": "",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
}
