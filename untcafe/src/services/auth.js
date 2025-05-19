import { login as authLogin } from './auth';
export const login = async (euid, password, navigation) => {
  try {
    const result = await authLogin(euid, password);
    if (result.success) {
      navigation.navigate('Home');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};



import api from './api';

export const login = async (euid, password) => {
  if (!euid || !password) {
    throw new Error('EUID and password are required');
  }

  try {
    const response = await api.post('/api/login', { euid, password });
    if (response.data.success) {
      return { success: true, userId: response.data.userId };
    } else {
      throw new Error(response.data.message || 'Invalid credentials');
    }
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Authentication failed');
    }
    throw new Error('Failed to connect to the server. Please try again.');
  }
};