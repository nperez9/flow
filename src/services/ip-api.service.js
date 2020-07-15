const axios = require('axios');

const getCurrentLocation = async (ip) => {
  try {
    console.log('paso por aca');
    const { data } = await axios.get(`http://ip-api.com/json/${(ip) ? ip : ''}`);
    return data;
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  getCurrentLocation
};