import express from 'express';
import productRouter from './src/router/product.mjs';
import userRouter from './src/router/user.mjs';

const server = express();

server.use(express.json());
server.use('/api/v1/user', userRouter);
server.use('/api/v1/product', productRouter);

server.listen(5000, ()=> {
    console.log('Server is running on http://localhost:5000');
})
