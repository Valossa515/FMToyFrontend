import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    const userStr = localStorage.getItem('user');
    
    if (userStr) {
      const user = JSON.parse(userStr);
      
      if (user.accessToken) {
        const token = 'Bearer ' + user.accessToken;
        console.log('Token:', token);                     
        config.headers.Authorization = token;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
