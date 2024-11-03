import express from "express";
import {registerUser, userLogin, createTask, getTask} from "../Controllers/todoControllers.js";



export const todoRoutes = express.Router()
todoRoutes.route("/user").post(registerUser)
todoRoutes.route("/user/login").post(userLogin)
todoRoutes.route("/user/create").post(createTask)
todoRoutes.route("/user/getTasks").get(getTask)
