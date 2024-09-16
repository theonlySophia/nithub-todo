import {DataTypes } from "sequelize";

import {sequelize} from "../Config/db.js";

export const Task_Info = sequelize.define(
    'Task_Info',
    {
      // Model attributes are defined here
      infoID: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
  
      taskName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
  
      status: {
          type: DataTypes.ENUM('Not Started', 'Completed'),
      }
    },
    {
        timestamp: true
    }
  );

// export default Task_Info;