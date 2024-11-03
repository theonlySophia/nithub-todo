// Create a todo api where users can register, login, add todos, retrieve todos etc. 
//Using sequelize
//next(error) passes the error to Express’s centralized error-handling middleware, making error management more modular and consistent across the app.

import AsyncHandler from "express-async-handler";

import {sequelize} from "../Config/db.js";
import {User_Table} from "../Models/user_Table.js";
import {Task_Details} from "../Models/Task_Details.js";
import{Task_Info} from "../Models/Task_Info.js";
import {hashPassword, comparePasswords} from "../Utils/passwords.js";
import {signToken, signRefreshToken} from "../Utils/token.js";

//register controller
export const registerUser = AsyncHandler(async(req,res,next)=>{
    try{
        const {userName,emailAddress, password} = req.body;
        if(!userName || !emailAddress ||!password){
            throw new Error;
        }
        const user = await User_Table.findOne({
            where: {emailAddress: emailAddress},
            attributes: ['emailAddress']
        }); 
        if(!user){
            const hashedPassword = await hashPassword(password);
            const user = await User_Table.create ({userName:userName , emailAddress:emailAddress, password: hashedPassword});
        return res.status(200).json({
            message: "User successfully registered",
            data: user
        });
        }
        res.status(200);
        throw new Error("User exists already");
    }catch(error){
        next(error);

    }

});

// login controller
export const userLogin = AsyncHandler(async(req,res,next)=>{
    try{
        const{emailAddress,password} = req.body;
        if(!emailAddress){
            res.status(400)
            throw new Error ("invalid input")
        }
        if (!password) {
            res.status(400);
            throw new Error("Password is required");
          }
        console.log(emailAddress);
        const user = await User_Table.findOne({
            where: {emailAddress: emailAddress},
            // attributes: [emailAddress]
        });
        console.log("fine here");
        if(!user){
            res.status(400)
            throw new Error("Email not found");
        }
        console.log("good here");
        //check that password is correct 
        const checkPassword = await comparePasswords(user.password, password);
        if(checkPassword){
            // return res.status(400).json({
            //     message: "password incorrect"
            // });
            const accessToken = signToken(user.userID)
            const refreshToken = signRefreshToken(user.userID)
            await User_Table.update(
                {refreshToken: refreshToken},
                {where:{userID: user.userID}}
            );
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
              });
            //console.log("good here too"); 
            const safeUser = { ...user.toJSON(), password: undefined };
            return res.status(200).json({
                user: { safeUser, refresh_token: null },
                token: accessToken,
              });
        }else{
            res.status(404)
            throw new Error("password incorrect");
        }

    }catch(error){
        next(error)
    }
});

//create task controller
// task is inputed into both task info and task details
export const createTask = AsyncHandler(async(req,res,next)=>{
    try{
        const {emailAddress} = req.body;
        if(emailAddress){
           const{taskName, description, status, taskDetails} = req.body; 
           if(!taskName || !description || !status ||!taskDetails){
            res.status(400);
            throw new Error("Values needed");
           }
           const user = await User_Table.findOne({
            where: {emailAddress: emailAddress},
        }); 
        console.log(user);
          if(user){
           const userID = user.userID;
           const task = await Task_Info.create({taskName: taskName, description:description, status:status, userID:userID,
            Task_Details: [
                {taskDetails: taskDetails, status:status}
            ]
           }, {
            include: [Task_Details]
           });
           return res.status(200).json({
            message: "task created successfully",
            data: task
        });
        }
        
    }
        else{
            res.status(400);
            throw new Error("Email address not found");
        
    }


    }catch(error){
        next(error);
    }
});

//get task by date controller
export const getTask = AsyncHandler(async(req,res,next)=>{
    try{
        const {emailAddress, createdAt} = req.body;
        if(!emailAddress){
            res.status(400)
            throw new Error ("invalid input")
        }
        if (!createdAt) {
            res.status(400);
            throw new Error("Date is required");
        }
        const user = await User_Table.findOne({
            where: {emailAddress: emailAddress},
        });
        const userID = user.userID;
        if(user){
            const getTasks = await Task_Info.findOne({
                where: {userID: userID, createdAt: createdAt},
                include: [{
                    model: Task_Details,
                }]
            });
            return res.status(200).json({
                message: "Tasks returned successfully",
                data: getTasks
            });

        }
        res.status(400);
        throw new Error("user not found");
    }catch(error){
        next(error);
    }

})

//update tasks controller
//const updateTask = 