const axios = require('axios');

const customAxios = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 1000
});

customAxios.interceptors.request.use(config => {
  config.params = {
    appid: process.env.API_KEY,
    ...config.params,
  };
  return config;
});

const getCurrentWeather = async (city) => {
  return customAxios.get('/weather', { params: { q: city }}).then(r => r.data);
};

const getForecast = async (city) => {
  return customAxios.get('/forecast', { params: { q: city }}).then(r => r.data);
};

module.exports = {
  getCurrentWeather,
  getForecast
};