import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.25.253.184:3000',
    // baseURL: 'http://192.168.0.5:3000',
  });
  
  export default api;