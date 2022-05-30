import axios from 'axios';

const api = axios.create({
  baseURL: 'http://filipeabner.ddns.net:5000'
});
export default api;