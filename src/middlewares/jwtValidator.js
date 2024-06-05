import dotenv from "dotenv";
dotenv.config();
import { response } from "express";
import jwt from "jsonwebtoken";

const validateJwt = async (req, res = response, next) => {
  try {
    const jwtValidate = jwt.verify(req.headers.jwt, process.env.PRIVATE_KEY);
    if (jwtValidate) {
      next();
    } else {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default validateJwt;
