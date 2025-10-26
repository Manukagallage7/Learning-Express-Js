import {Router} from 'express'
import testMiddleware from '../utils/testMiddleware.mjs'

const testRouter = Router()

testRouter.get('/',
    testMiddleware,
    (req, res, next) => {
        console.log('2')
        next()
    },
    (req, res) => {
        console.log('3')
        res.sendStatus(200)
    }
)

export default testRouter