import {DataTypes} from "sequelize";

import {sequelize} from "../Config/db.js";

export const Task_Details = sequelize.define(
    'Task_Details',
    {
      // Model attributes are defined here
      taskID: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
  
      taskDetails: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      status: {
          type: DataTypes.ENUM('Not Started', 'Completed'),
      }
    },
  );

// export default Task_Details;