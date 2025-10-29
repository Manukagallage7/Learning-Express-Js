import express from 'express';
import productRouter from './src/router/product.mjs';
import userRouter from './src/router/user.mjs';
import testRouter from './src/router/test.mjs';
import profileRouter from './src/router/profile.mjs';

const server = express();

server.use(express.json());
server.use('/api/v1/user', userRouter);
server.use('/api/v1/product', productRouter);
server.use('/api/v1/test', testRouter);
server.use('/api/v1/profile', profileRouter);

server.listen(5000, ()=> {
    console.log('Server is running on http://localhost:5000');
})
