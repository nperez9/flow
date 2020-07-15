const { getMockReq, getMockRes } = require('@jest-mock/express');
const forecastController = require('./forecast.controller');

jest.mock('../services/ip-api.service', () => { 
  return  { 
    getCurrentLocation: jest.fn()
      .mockImplementationOnce(() => new Promise(resolve => resolve({status: 'success', city: 'Buenos Aires'})))
      .mockImplementationOnce(() => {throw new Error('error')})
  }
});

jest.mock('../services/weather.service', () => {
  return { getForecast: jest.fn(async (city) => new Promise(resolve => resolve({city}))) }
});


describe('Forecast endpoint', () => {
  const { res, next, clearMockRes } = getMockRes();
  beforeEach(() => {
    clearMockRes();
  })
  it('Should return city params', async function () {
    const city = 'Berlin';
    const req = getMockReq({ params: {city} });
    await forecastController(req, res, next);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        city
      }),
    );
  });

  it('Should return Buenos Aires as default', async function () {
    const req = getMockReq();
    await forecastController(req, res, next);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        city: 'Buenos Aires'
      }),
    );
  });

  it('Shuld pass to the next in case of error', async () => {
     const req = getMockReq();
     await forecastController(req, res, next);
     expect(next).toHaveBeenCalled();
  });
});
