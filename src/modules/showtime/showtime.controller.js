import { Router } from "express";
import { isAuthenticate } from "../../middlewares/auth.middleware.js";
import { isAuthorization } from "../../middlewares/authorization.middleware.js";
import { roles } from "../../db/models/user.model.js";
import { isValid } from "../../middlewares/validation.middleware.js";
import * as showtimeValidation from "./showtime.validation.js";
import * as showtimeService from "./showtime.service.js";
import { asyncHandler } from "../../utils/error/async-handler.js";
const router = Router();

router.post(
  "/",
  isAuthenticate,
  isAuthorization(roles.ADMIN,roles.USER),
  isValid(showtimeValidation.createShowTime),
  asyncHandler(showtimeService.createShowtime)
);
router.get(
  "/",
  isAuthenticate,
  isAuthorization(roles.ADMIN,roles.USER),
  asyncHandler(showtimeService.getAllShowtime)
);
router.put(
  "/:showtimeId",
  isAuthenticate,
  isAuthorization(roles.ADMIN,roles.USER),
  asyncHandler(showtimeService.updateShowtime)
);

router.get("/:showtimeId",
  isAuthenticate,
  isAuthorization(roles.USER, roles.ADMIN),
  asyncHandler(showtimeService.getSpecifiShowtime)
);

router.delete("/:showtimeId",
  isAuthenticate,
  isAuthorization(roles.USER, roles.ADMIN),
  asyncHandler(showtimeService.deleteShowtime)
);

export default router;