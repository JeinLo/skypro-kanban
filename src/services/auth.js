import axios from "axios";

const API_URL = "https://wedev-api.sky.pro/api/user";

export async function signIn({ login, password }) {
  try {
    const formData = new URLSearchParams();
    formData.append("login", login);
    formData.append("password", password);

    const response = await axios.post(`${API_URL}/login`, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  } catch (err) {
    throw new Error("Ошибка входа");
  }
}

export async function signUp({ name, login, password }) {
  try {
    const formData = new URLSearchParams();
    formData.append("name", name);
    formData.append("login", login);
    formData.append("password", password);

    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  } catch (err) {
    throw new Error("Ошибка регистрации");
  }
}
