import { login as authLogin } from '../models/auth';
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
