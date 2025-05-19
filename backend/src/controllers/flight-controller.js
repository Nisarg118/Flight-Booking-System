const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

// POST: /flights
// req-body: {flightNumber,
//   airplaneId,
//   departureAirportId,
//   arrivalAirportId,
//   arrivalTime,
//   departureTime,
//   price,
//   boardingGate,
//   totalSeats,}

async function createFlight(req, res) {
  try {
    const {
      flightNumber,
      airplaneId,
      departureAirportId,
      arrivalAirportId,
      arrivalTime,
      departureTime,
      price,
      boardingGate,
      totalSeats,
    } = req.body;
    const flight = await FlightService.createFlight({
      flightNumber,
      airplaneId,
      departureAirportId,
      arrivalAirportId,
      arrivalTime,
      departureTime,
      price,
      boardingGate,
      totalSeats,
    });
    SuccessResponse.data = flight;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

// GET: /flights
// req-body: {}

async function getAllFlights(req, res) {
  try {
    const flights = await FlightService.getAllFlights(req.query);
    SuccessResponse.data = flights;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

// GET: /flight/:id
// req-body: {}
async function getFlight(req, res) {
  try {
    const flight = await FlightService.getFlight(req.params.id);
    SuccessResponse.data = flight;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
};
