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


    const response = await api.get(`/api/cafes/${cafeId}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getItemsByCategory = async (categoryId) => {
  try {
    console.log('Trying to fetch data , No worries ..!')
    const res = await api.get(`/api/categories/${categoryId}/items`);
    return res.data;
  } catch (error) {
    console.log('error while fetching data :', error);
    throw error
  }

};

export const getItemById = async (itemId) => {
  try {
    console.log('Fetching item details for ID:', itemId);
    const res = await api.get(`/api/items/${itemId}`);
    return res.data;
  } catch (error) {
    console.error('Error while fetching item details:', error);
    throw error;
  }
};


export const getAddOnsByCategory = async (categoryId) => {
  try {
    console.log('Fetching add-ons for category ID:', categoryId);
    const res = await api.get(`/api/categories/${categoryId}/addons`);
    console.log('hi');
    console.log('Fetched add-ons:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching add-ons:', error);
    return [];
  }
};




export default api;