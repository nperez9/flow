const ipApiService = require('../services/ip-api.service');

const locationController = async function (req, res, next) {
  try {
    const currentLocation = await ipApiService.getCurrentLocation();
    res.json(currentLocation);
  } catch (e) {
    next(e);
  }
};

module.exports = locationController;