import {Router} from 'express';
import categoryRouter from '../controller/categoryController.mjs';

const rootRouter = Router();

rootRouter.use("/category", categoryRouter);
export default rootRouter;