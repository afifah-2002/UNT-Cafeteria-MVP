/*import axios from 'axios';
import { config } from 'dotenv';

config(); // Load from .env
const Ipv4 = '192.168.1.230';
const api = axios.create({
    baseURL: `http://${process.env.API_IP}:5000`,
});

export const getHomeData = async () => {
    try {
        const response = await api.get('/');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};*/


import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.230:5000/api', // ✅ use your machine's local IP
});

export const getAllCafes = async () => {
  const res = await api.get('/cafes');
  return res.data;
};

export const getCategoriesByCafe = async (cafeId) => {
  const res = await api.get(`/cafes/${cafeId}/categories`);
  return res.data;
};

export const getItemsByCategory = async (categoryId) => {
  console.log("api")
  const res = await api.get(`/categories/${categoryId}/items`);
  console.log(res)
  return res.data;
};

