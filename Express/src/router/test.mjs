import {Router} from 'express'

const testRouter = Router()

testRouter.get('/', (req, res, next)=> {
    console.log('1')
    next()
},
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