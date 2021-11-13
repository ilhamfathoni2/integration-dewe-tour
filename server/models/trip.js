"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      trip.belongsTo(models.country, {
        foreignKey: {
          name: "countryId",
        },
      });
    }
  }
  trip.init(
    {
      title: DataTypes.STRING,
      countryId: DataTypes.INTEGER,
      accomodation: DataTypes.STRING,
      transportation: DataTypes.STRING,
      eat: DataTypes.STRING,
      day: DataTypes.STRING,
      night: DataTypes.STRING,
      dateTrip: DataTypes.STRING,
      price: DataTypes.INTEGER,
      quota: DataTypes.STRING,
      quotaMinus: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "trip",
    }
  );
  return trip;
};
