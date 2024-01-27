import axios from 'axios';

const AUTH_REST_API_BASE_URL =
  'https://todo-list-demo-ab0a43442d6a.herokuapp.com/api/auth';

export const registerApiCall = (registerObj) =>
  axios.post(AUTH_REST_API_BASE_URL + '/register', registerObj);

export const loginApiCall = (loginObj) =>
  axios.post(AUTH_REST_API_BASE_URL + '/login', loginObj);

export const storeToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');

export const saveLoggedInUser = (username, role) => {
  sessionStorage.setItem('authenticatedUser', username);
  sessionStorage.setItem('role', role);
};
export const isUserLoggedIn = () => {
  const username = sessionStorage.getItem('authenticatedUser');
  return !(username === null);
};
export const getLoggedInUser = () =>
  sessionStorage.getItem('authenticatedUser');

export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
};

export const isAdminUser = () => {
  let role = sessionStorage.getItem('role');
  return role !== null && role === 'ROLE_ADMIN';
};
