import api from "./api";

export async function loginUser(username, password) {
  const response = await api.post("token/", { username, password });
  return response.data;
}

export async function registerUser(username, password, email, firstName, lastName) {
  const response = await api.post("users/register/", {
    username,
    password,
    email,
    first_name: firstName,
    last_name: lastName,
  });

  return response.data;
}

export async function logoutUser() {
  try {
    await api.post("users/logout/");
  } catch (error) {
    // Mesmo em caso de erro, continuamos com o logout
    console.log("Erro ao confirmar logout no servidor:", error);
  }
}

export async function getCurrentUser() {
  const response = await api.get("users/me/");
  return response.data;
}

export async function updateUser(userData) {
  const response = await api.put("users/me/", userData);
  return response.data;
}