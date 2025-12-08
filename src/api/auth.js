import client from './client';

export async function register({ email, password, name, phone }) {
  const res = await client.post('/auth/register', { email, password, name, phone });
  const data = res.data;
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);
  return data;
}

export async function login({ email, password }) {
  const res = await client.post('/auth/login', { email, password });
  const data = res.data;
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);
  return data;
}

export async function refresh(refreshToken) {
  const res = await client.post('/auth/refresh', { token: refreshToken });
  const data = res.data;
  localStorage.setItem('access_token', data.access_token);
  return data;
}

export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}
