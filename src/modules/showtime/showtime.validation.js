import joi from "joi";
import {generalFields} from "../../middlewares/validation.middleware.js";

export const createShowTime =joi.object({
  movieId:generalFields.id.required(),
  startTime: joi.date().required(),
  price:joi.number().positive().required(),
  totalSeats:joi.number().integer().min(1).required(),
  reservedSeats:joi.array().items(joi.number().min(1)).default([]), 
  roomNumber:joi.number().integer().min(1).default(1) 
}).required();

