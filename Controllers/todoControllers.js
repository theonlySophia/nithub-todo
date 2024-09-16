// Create a todo api where users can register, login, add todos, retrieve todos etc. 
//Using sequelize
//next(error) passes the error to Express’s centralized error-handling middleware, making error management more modular and consistent across the app.

import AsyncHandler from "express-async-handler";

import {sequelize} from "../Config/db.js";
import {User_Table} from "../Models/user_Table.js";
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