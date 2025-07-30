import { Router } from "express"; 
import { isAuthenticate } from "../../middlewares/auth.middleware.js";
import { isAuthorization } from "../../middlewares/authorization.middleware.js"; 
import {roles } from "../../db/models/user.model.js"; 
import { isValid } from "../../middlewares/validation.middleware.js";
import { asyncHandler } from "../../utils/error/async-handler.js"; 
import * as adminService from "./admin.service.js"; 
import * as adminValidation from "./admin.validation.js";
const router = Router();
router.use(isAuthenticate,isAuthorization(roles.ADMIN))
 // get all users
router.get( 
    "/users",
   asyncHandler (adminService.getAllUsers ),
);

router.patch(
    "/role",
    isValid(adminValidation.updateRole),
   asyncHandler (adminService.updateRole ),
);
// Delete user
router.delete(
  "/users/:id",
  isValid(adminValidation.userId),
  asyncHandler(adminService.deleteUser)
);

export default router;

