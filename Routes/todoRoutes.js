import express from "express";
import {registerUser, userLogin} from "../Controllers/todoControllers.js";



export const todoRoutes = express.Router()
todoRoutes.route("/user").post(registerUser)
todoRoutes.route("/user/login").post(userLogin)