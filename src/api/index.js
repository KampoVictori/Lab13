import {Router} from "express";
import bookkeepingRouter from "./bookkeeping";

const apiRouter = new Router();

apiRouter.use("/bookkeeping", bookkeepingRouter);

export default apiRouter;