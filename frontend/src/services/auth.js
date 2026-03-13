import api from "./api";

export async function loginUser(username, password) {
  const response = await api.post("token/", { username, password });
  return response.data;
}

export async function registerUser(username, password, email) {
  const response = await api.post("register/", { username, password, email });
  return response.data;
}