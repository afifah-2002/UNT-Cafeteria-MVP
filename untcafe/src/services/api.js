import axios from 'axios';

const Ipv4 = '192.168.1.230';
const api = axios.create({
  // baseURL: `http://${process.env.API_IP}:5000`,
  baseURL: `http://192.168.1.138:5000`,
});

export const getHomeData = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
