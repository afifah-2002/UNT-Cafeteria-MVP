import axios from 'axios';

const Ipv4 = 'http://192.168.1.230:5000'; // Updated to your local network IP
const api = axios.create({
  baseURL: Ipv4,
});

export default api;