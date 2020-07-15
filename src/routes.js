const router = require('express').Router();
const locationController = require('./controllers/location.controller');
const currentController = require('./controllers/current.controller');
const forecastController = require('./controllers/forecast.controller');
const errorMiddleware = require('./shared/error.middleware');

router.get('/location', locationController);
router.get('/current/:city?', currentController);
router.get('/forecast/:city?', forecastController);
router.use(errorMiddleware);

module.exports = router;