import express from 'express';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import DB from './src/db/db.mjs';
import productRouter from './src/router/product.mjs';
import userRouter from './src/router/user.mjs';
import testRouter from './src/router/test.mjs';
import profileRouter from './src/router/profile.mjs';
import { checkAuth } from './src/utils/authMiddleware.mjs';
import categoryRouter from './src/router/category.mjs';
import { Prisma } from '@prisma/client';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

const server = express();

server.use(express.json());
server.use(cookieParser('mykey123'));
server.use(expressSession({
    secret: 'mykey123',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000,
        httpOnly: true,
        signed: true
    },
    store: new PrismaSessionStore(DB, {
        checkPeriod: 2*60*1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined
    })
}));
server.use('/api/v1/user', userRouter);
server.use('/api/v1/product', productRouter);
server.use('/api/v1/test', testRouter);
server.use('/api/v1/profile',checkAuth, profileRouter);
server.use('/api/v1/category', categoryRouter);

server.listen(5000, ()=> {
    console.log('Server is running on http://localhost:5000');
})
