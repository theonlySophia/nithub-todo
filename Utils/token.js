import jwt from "jsonwebtoken";
import {secret} from "../Config/constants.js";

export const signToken = (userID) => {
    let payload = {
        userID,
    };
    let token = jwt.sign(payload, secret, {
        expiresIn: "5d",
    });
    return token;
};

export const signRefreshToken = (userID) => {
    let payload = {
      userID,
    };
    let token = jwt.sign(payload, secret, {
      expiresIn: "30d",
    });
    return token;
  };