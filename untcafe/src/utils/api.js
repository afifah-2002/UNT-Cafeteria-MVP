import axios from 'axios';

const Ipv4 = 'http://192.168.1.138:5000'; // Updated to your local network IP
const api = axios.create({
  baseURL: Ipv4,
});

export const getAllCafes = async () => {
  try {
    const response = await api.get('/api/cafes');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCategoriesByCafe = async (cafeId) => {
  try {
    console.log('HIHIHIH')

    const response = await api.get(`/api/cafes/${cafeId}/categories`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export default api;