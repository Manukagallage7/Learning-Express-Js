import {Router} from 'express';
import userRouter from '../controller/userController.mjs';
import productRouter from '../controller/productController.mjs';
import categoryRouter from '../controller/categoryController.mjs';
import seedsRouter from '../controller/seedsController.mjs';

const rootRouter = Router()

rootRouter.use("/user", userRouter);
rootRouter.use("/product", productRouter);
rootRouter.use("/category", categoryRouter);
rootRouter.use("/seeds", seedsRouter);

export default rootRouter;