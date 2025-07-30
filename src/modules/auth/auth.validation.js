import joi from "joi";
import { genders } from "../../db/models/user.model.js";

// register
export const register = joi
  .object({
    userName: joi.string().min(2).max(20).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    phone: joi.string().required(),
    gender: joi
      .string()
      .valid(...Object.values(genders)),
  })
  .required();

// login
export const login = joi
  .object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  })
  .required();

