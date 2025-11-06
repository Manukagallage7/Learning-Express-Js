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
        {
            httpOnly: true,
            signed: true,
            maxAge: 30000
        })
    res.cookie('Manuka-cookie', 'Manuka-Gallage',
        {
            httpOnly: true,
            maxAge: 60000
        }
    )
        return res.sendStatus(200)
})


testRouter.get('/read-cookie', (req, res)=> {
    console.log(req.cookies)
    console.log(req.signedCookies['test-cookie'])

    res.sendStatus(200)

})

testRouter.get('/get-session', (req, res)=> {
    req.session['Manu-session'] = {
        name: 'Manuka',
        age: 22
    }
    req.session['Seni-session'] = {
        name: 'Senitha',
        age: 21
    }
    return  res.sendStatus(200)
})

testRouter.get('/read-session', (req, res)=> {
    console.log(req.sessionID)

    console.log(req.session['Manu-session'])
    console.log(req.session['Seni-session']) 

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