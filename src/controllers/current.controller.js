const ipApiService = require('../services/ip-api.service');
const weatherService = require('../services/weather.service');

const currentController = async (req, res, next) => {
  try {
    let { city } = req.params;
    if (!city) {
      const currentLocation = await ipApiService.getCurrentLocation();
      city = currentLocation.city;
    }
    const currentWeather = await weatherService.getCurrentWeather(city);
    res.json(currentWeather);
  } catch (e) {
    next(e);
  }
};

module.exports = currentController;