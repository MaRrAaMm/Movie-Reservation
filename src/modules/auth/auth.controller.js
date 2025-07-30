import { Router } from "express";
import *as authService from "./auth.service.js";
import * as authValidation from "./auth.validation.js";
import { isValid } from "../../middlewares/validation.middleware.js";
import { asyncHandler } from "../../utils/error/async-handler.js";
const router = Router();

//register
router.post(
    "/register",
    isValid(authValidation.register),
    asyncHandler(authService.register)
);

//login
router.post(
    "/login",isValid(authValidation.login),
    authService.login
);




export default router;