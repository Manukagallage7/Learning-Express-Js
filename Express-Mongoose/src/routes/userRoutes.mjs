import {Router} from 'express';
import userRouter from '../controller/userController.mjs';
import productRouter from '../controller/productController.mjs';

const rootRouter = Router()

rootRouter.use("/user", userRouter);
rootRouter.use("/product", productRouter);

export default rootRouter;