const { StatusCodes } = require("http-status-codes");

const { Logger } = require("../config");
const AppError = require("../utils/errors/app-error");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const response = await this.model.create(data);
    return response;
  }

  async destroy(data) {
    const response = await this.model.destroy({
      where: {
        id: data,
      },
    });
    if (!response) {
      throw new AppError("Not able to find resoure", StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async get(data) {
    const response = await this.model.findByPk(data);
    if (!response) {
      throw new AppError("Not able to find resoure", StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async getAll(data) {
    const response = await this.model.findAll();
    return response;
  }

  async update(id, data) {
    try {
      const response = await this.model.update(data, {
        where: { id },
      });
      if (response[0] === 0) {
        throw new AppError("Airplane not found", StatusCodes.NOT_FOUND);
      }

      const updatedRecord = await this.model.findByPk(id);
      return updatedRecord;
    } catch (error) {
      console.error("Sequelize Update Error:", error); // << log real error here
      throw error;
    }
  }
}

module.exports = CrudRepository;
