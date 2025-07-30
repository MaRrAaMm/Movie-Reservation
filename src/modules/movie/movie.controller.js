import { Router } from "express";
import { isAuthenticate } from "../../middlewares/auth.middleware.js";
import { isAuthorization } from "../../middlewares/authorization.middleware.js";
import { roles } from "../../db/models/user.model.js";
import { cloudUpload, fileValidation } from "../../utils/file uploads/multer cloud.js";
import { isValid } from "../../middlewares/validation.middleware.js";
import * as movieValidation from "./movie.validation.js";
import * as movieService from"./movie.service.js";
import { asyncHandler } from "../../utils/error/async-handler.js";

const router = Router();

router.post("/",
    isAuthenticate,
    isAuthorization(roles.ADMIN),
    cloudUpload(fileValidation.images).single("poster"),
    isValid(movieValidation.createMovie),
    asyncHandler(movieService.createMovie)

);
//get all movies
router.get(
  "/",
  isAuthenticate, 
  isAuthorization(roles.USER,roles.ADMIN),
  asyncHandler(movieService.getMovies)
);
//update movie
router.put(
  "/:movieId",
  isAuthenticate,
  isAuthorization(roles.ADMIN),
  // upload.single("poster"),
  asyncHandler(movieService.updateMovie)
);

router.delete("/:movieId",
  isAuthenticate,
  isAuthorization(roles.ADMIN),
  asyncHandler(movieService.deleteMovie)
);

router.get("/:movieId",
  isAuthenticate,
  isAuthorization(roles.USER, roles.ADMIN),
  asyncHandler(movieService.getSingleMovie)
);


export default router;