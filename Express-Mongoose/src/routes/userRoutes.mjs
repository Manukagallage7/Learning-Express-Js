import {Router} from 'express';
import userRouter from '../controller/userController.mjs';

const rootRouter = Router()

rootRouter.use("/user", userRouter);


export default rootRouter;