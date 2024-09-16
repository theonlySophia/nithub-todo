//import {sequelize, DataTypes} from "sequelize";
//import {sequelize} from "../Config/constants.js";
import {User_Table} from "./user_Table.js";
import {Task_Info} from "./Task_Info.js";
import {Task_Details} from "./Task_Details.js";

export const defineAssociations =()=>{
User_Table.hasMany(Task_Info, { foreignKey: 'userID', onDelete: 'CASCADE' });
Task_Info.belongsTo(User_Table, { foreignKey: 'userId', onDelete: 'CASCADE' });

Task_Info.hasMany(Task_Details, { foreignKey: 'infoID', onDelete: 'CASCADE' });
Task_Details.belongsTo(Task_Info, { foreignKey: 'infoId', onDelete: 'CASCADE' });
}

//export default {defineAssociations}
