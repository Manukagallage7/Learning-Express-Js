import express from 'express';
import productRouter from './src/router/product.mjs';
import userRouter from './src/router/user.mjs';

const server = express();

server.use(userRouter)
server.use(productRouter)

server.listen(5000, ()=> {
    console.log('Server is running on http://localhost:5000');
})
