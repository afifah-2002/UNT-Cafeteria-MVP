import axios from 'axios';

const Ipv4 = 'http://192.168.1.230:5000'; // Updated to your local network IP
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

export const getItemsByCategory = async(categoryId)  => {
  try {
    console.log('Trying to fetch data , No worries ..!')
    const res = await api.get(`/api/categories/${categoryId}/items`);
    return res.data; 
  } catch(error){
    console.log('error while fetching data :',error);
    throw error
  }

};
  
            


export default api;