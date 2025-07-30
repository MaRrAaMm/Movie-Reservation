import { Router } from "express";
import { isAuthenticate } from "../../middlewares/auth.middleware.js";
import { isAuthorization } from "../../middlewares/authorization.middleware.js";
import { roles } from "../../db/models/user.model.js";
import * as reservationService from "./reservation.service.js";
import { asyncHandler } from "../../utils/error/async-handler.js";

const router =Router();

router.post(
  "/",
  isAuthenticate,
  isAuthorization(roles.ADMIN,roles.USER),
  asyncHandler(reservationService.createReservation)
);

router.get(
  "/",
  isAuthenticate, 
  isAuthorization(roles.USER,roles.ADMIN),
  asyncHandler(reservationService.getAllReservation)
);

router.get("/:reservationId",
  isAuthenticate,
  isAuthorization(roles.USER, roles.ADMIN),
  asyncHandler(reservationService.getSpecificReservation)
);

router.patch("/:reservationId",
  isAuthenticate,
  isAuthorization(roles.USER, roles.ADMIN),
  asyncHandler(reservationService.cancelReservation)
);



export default router;