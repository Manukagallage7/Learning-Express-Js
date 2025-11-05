import {Router} from 'express'
import { matchedData, query, validationResult } from 'express-validator'
import { validatorMethod } from '../utils/validatorMiddleware.mjs';

const testRouter = Router()

testRouter.get('/abc',
    validatorMethod(),
    (req, res) => {

    const r = validationResult(req)
    const d = matchedData(req)
    console.log(d)

    if(r.array().length) return res.sendStatus(400);

    res.sendStatus(200)
})

testRouter.get('/get-cookie', (req, res)=> {
    res.cookie('test-cookie', 'test-value',
        {httpOnly: true, maxAge: 30000})
        return res.sendStatus(200)
})

testRouter.get('/read-cookie', (req, res)=> {
    console.log(req.cookies)
    console.log(req.headers.cookie)

    res.sendStatus(200)

})

export default testRouter


/*

testRouter.get('/abc',
    query("name").isString().withMessage('not a String'),
    query("age").isNumeric().withMessage('not a number'),
    (req, res) => {

    const r = validationResult(req)
    console.log(r.array())

    if(r.array().length) return res.sendStatus(400);

    res.sendStatus(200)
})

*/


/*

testRouter.get('/abc/:name/:age',
    param("name").isString().withMessage('not a String'),
    param("age").isNumeric().withMessage('not a number'),
    (req, res) => {

    const r = validationResult(req)
    console.log(r.array())

    if(r.array().length) return res.sendStatus(400);

    res.sendStatus(200)
})

*/

/*

testRouter.get('/abc',
    body("name").isString().withMessage('not a String'),
    body("age").isNumeric().withMessage('not a number'),
    (req, res) => {

    const r = validationResult(req)
    console.log(r.array())

    if(r.array().length) return res.sendStatus(400);

    res.sendStatus(200)
})

*/

/*
testRouter.get('/abc',
    checkSchema({
    name:{
        isEmail: true,
        errorMessage: 'not a email'
    },
    age:{
        isNumeric: true,
        errorMessage: 'not a number'
    }
    }),
    (req, res) => {

    const r = validationResult(req)
    console.log(r.array())

    if(r.array().length) return res.sendStatus(400);

    res.sendStatus(200)
})
*/