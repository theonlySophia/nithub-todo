// After installing dotenv import it here
import dotenv from "dotenv";
//
dotenv.config();

// exporting using es module
export const secret = process.env.JWT_SECRET;
export const host = process.env.HOST;
export const dbPort = process.env.DB_PORT;
export const database = process.env.DB_NAME;
export const username = process.env.DB_USER;
export const password = process.env.DB_PASSWORD;
export const PORT = process.env.PORT;
export const mailUser = process.env.MAIL_USER;
export const mailPass = process.env.MAIL_PASS;
