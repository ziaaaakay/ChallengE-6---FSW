"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'creator',
      })

      this.belongsTo(models.User, {
        foreignKey: 'updatedBy',
        as: 'updator',
      })

      this.belongsTo(models.User, {
        foreignKey: 'deletedBy',
        as: 'deletor'
      })
    }
  };

  Car.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      size: DataTypes.STRING,
      image: DataTypes.STRING,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
      deletedBy: DataTypes.INTEGER,
      available: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Car",
    }
  );
  return Car;
};
