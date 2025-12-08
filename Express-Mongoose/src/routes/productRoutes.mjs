import {Router} from 'express';
import productRouter from '../controller/productController.mjs';

const rootRouter = Router();

rootRouter.use("/product", productRouter);

export default rootRouter;