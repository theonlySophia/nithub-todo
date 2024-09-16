import {host, database, username, password} from "./constants.js";
import {Sequelize} from "sequelize";

export const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect:'postgres'});

export const authenticateDB = async()=> {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({
            alter: true
        });
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}