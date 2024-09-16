import {DataTypes } from "sequelize";

import {sequelize} from "../Config/db.js";

export const User_Table = sequelize.define(
  'User_Table',
  {
    // Model attributes are defined here
    userID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  }
)
  
//export default User_Table;