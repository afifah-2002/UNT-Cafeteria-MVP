import axios from 'axios';

//replace with your local IPv4
const Ipv4 = '192.168.56.1';
const api = axios.create({
    baseURL: `http://${Ipv4}:5000`, // Update with your backend URL
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