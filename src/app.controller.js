import connectDB from "./db/connection.js";
import authRouter from "./modules/auth/auth.controller.js";
import movieRouter from "./modules/movie/movie.controller.js";
import { globalError } from "./utils/error/global-error.js";
import adminRouter from "./modules/admin/admin.controllers.js";
import userRouter from "./modules/user/user.controller.js";
import showtimeRouter from "./modules/showtime/showtime.controller.js";
import reservationRouter from "./modules/reservation/reservation.controller.js"
const bootstrap = async(app, express) =>{
    app.use(express.json());

    await connectDB();
    app.use("/auth", authRouter);
    app.use("/movie",movieRouter);
    app.use("/admin", adminRouter);
    app.use("/user", userRouter);
    app.use("/showtime",showtimeRouter);
    app.use("/reservation",reservationRouter);
    app.use(globalError);
};
export default bootstrap;