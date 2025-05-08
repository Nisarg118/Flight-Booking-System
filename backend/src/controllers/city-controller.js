const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

// POST: /cities
// req-body: {name:"Delhi"}

async function createCity(req, res) {
  try {
    const city = await CityService.createCity({
      name: req.body.name,
    });
    SuccessResponse.data = city;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

// PATCH: /cities/:id
// req-body: {}

async function updateCity(req, res) {
  try {
    const city = await CityService.updateCity(req.params.id, req.body);
    SuccessResponse.data = city;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    console.error("Update City Error:", error);

    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

module.exports = { createCity, updateCity };
