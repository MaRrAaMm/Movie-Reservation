import { Router } from "express";
import * as userService from "./user.service.js"
import { isAuthenticate } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/error/async-handler.js";
const router = Router();
router.get(
    "/user",
    isAuthenticate,
     userService.getUser
    );

//update
router.put("/update", isAuthenticate,asyncHandler(userService.updateUser));


export default router;