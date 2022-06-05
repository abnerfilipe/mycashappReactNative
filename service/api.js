import axios from 'axios';

const api = axios.create({
  baseURL: `https://nameless-fjord-66404.herokuapp.com`
});
export default api;