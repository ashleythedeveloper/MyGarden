import axios from 'axios';

  
  const baseURL = 'https://api.mygarden.ashleythewebdeveloper.com.au';
  // const baseURL = 'http://localhost:5001';

  
  const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  });


export default axiosInstance