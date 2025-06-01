import axios from 'axios';

const API_URL = 'http://192.168.1.138:5000';

export const fetchFavorites = async (userId) => {
  try {
    const { data } = await axios.get(`${API_URL}/favourites/${userId}`);
    return data;
  } catch (err) {
    const errorMsg = err.response?.data?.message || err.message;
    if (errorMsg !== 'No favorites found for this user') {
      console.error('Error fetching favorites:', errorMsg);
    }
    return [];
  }
};

export const addFavorite = async (userId, itemId) => {
  const requestBody = { UserID: userId, itemID: itemId };
  console.log('Add Favorite request body:', requestBody); // Debug log
  const response = await axios.post(`${API_URL}/favourites`, requestBody);
  return response.data.favourite;
};

export const removeFavorite = async (userId, itemId) => {
  console.log('Remove Favorite request params:', { userId, itemId }); // Debug log
  await axios.delete(`${API_URL}/favourites/${userId}/${itemId}`);
};