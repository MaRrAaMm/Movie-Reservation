import joi from "joi";
import { generalFields } from "../../middlewares/validation.middleware.js";
import { roles } from "../../db/models/user.model.js";

export const userId = joi.object({
  id: generalFields.id.required(),
}).required(); 

export const updateRole = joi.object({
  userId: generalFields.id.required(),
  role:joi.string().valid(...Object.values(roles)).required(),
})
.required()