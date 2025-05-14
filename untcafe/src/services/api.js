import axios from 'axios';
import { config } from 'dotenv';

config(); // Load from .env

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
};
