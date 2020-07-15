const ipApiService = require('../services/ip-api.service');
const weatherService = require('../services/weather.service');

const forecastController = async (req, res, next) => {
  try {
    let { city } = req.params;
    if (!city) {
      const currentLocation = await ipApiService.getCurrentLocation();
      city = currentLocation.city;
    }
    const forecastWeather = await weatherService.getForecast(city);
    res.json(forecastWeather);
  } catch (e) {
    next(e);
  }
};

module.exports = forecastController;