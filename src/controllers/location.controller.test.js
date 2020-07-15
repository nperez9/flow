const { getMockReq, getMockRes } = require('@jest-mock/express');
const locationController = require('./location.controller');

jest.mock('../services/ip-api.service', () => { 
  return  { 
    getCurrentLocation: jest.fn()
      .mockImplementationOnce(() => new Promise(resolve => resolve({status: 'success'})))
      .mockImplementationOnce(() => {throw new Error('error')})
  }
});

describe('Location endpoint', () => {
  const { res, next, clearMockRes } = getMockRes();
  beforeEach(() => {
    clearMockRes();
  })
  it('Should return a success response', async function () {
    const req = getMockReq();
    await locationController(req, res, next);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "success",
      }),
    );
  });

  it('Shuld pass to the next in case of error', async () => {
     const req = getMockReq();
     await locationController(req, res, next);
     expect(next).toHaveBeenCalled();
  });
});
