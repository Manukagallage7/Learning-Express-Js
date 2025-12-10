import {Router} from 'express';
import userRouter from '../controller/userController.mjs';
import productRouter from '../controller/productController.mjs';
import categoryRouter from '../controller/categoryController.mjs';

const rootRouter = Router()

rootRouter.use("/user", userRouter);
rootRouter.use("/product", productRouter);
rootRouter.use("/category", categoryRouter);

export default rootRouter;