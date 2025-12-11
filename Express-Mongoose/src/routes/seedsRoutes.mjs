import {Router} from 'express';
import seedsRouter from '../controller/seedsController.mjs';

const rootRouter = Router();

rootRouter.use("/seeds", seedsRouter);

export default rootRouter;