import axios from "axios";

const AUTH_REST_API_BASE_URL = "http://localhost:8080/api/auth";

export const registerApiCall = (registerObj) =>
  axios.post(AUTH_REST_API_BASE_URL + "/register", registerObj);

export const loginApiCall = (loginObj) =>
  axios.post(AUTH_REST_API_BASE_URL + "/login", loginObj);

export const storeToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (username) =>
  sessionStorage.setItem("authenticatedUser", username);
export const isUserLoggedIn = () => {
  const username = sessionStorage.getItem("authenticatedUser");
  return !(username === null);
};
export const getLoggedInUser = () =>
  sessionStorage.getItem("authenticatedUser");

export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
};
