import joi from "joi";
import { generalFields } from "../../middlewares/validation.middleware.js";

export const createMovie = joi
  .object({
    title: joi.string().min(2).max(50).required(),
    description: joi.string().min(10).max(1000).required(),
    genre: joi.string().valid("action", "comedy", "drama", "horror", "sci-fi", "romance").required(),
    poster: generalFields.attachment,
    duration: joi.number().min(30).max(300).required()
  })
  .required();
