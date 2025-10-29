import { body, query } from 'express-validator'

export const validatorMethod = ()=> [
    body("name")
        .isEmail()
        .withMessage('not a email'),
    body("age")
        .isNumeric()
        .withMessage('not a number'),
    query('city').isString().withMessage('not a string'),
]

export const registerValidate= ()=> [
    body('Username').notEmpty().withMessage('Please Enter the Username'),
    body('Password').notEmpty().withMessage('Password not found').isStrongPassword({minlength: 8, minLowercase:1, minUppercase:1, minNumbers:1, minSymbols:1}).withMessage('Password is not strong enough'),
    body('Name').notEmpty().withMessage('Please Enter the Name'),
    body('Email').isEmail().withMessage('Please Enter a valid Email'),
]

export const comValidate = (...keys)=> {
    const loginVa = []
    keys.forEach(k=>{
        loginVa.push(body(k).notEmpty().withMessage(`Please Enter the ${k}`))
    })

    return loginVa;
}

export const comQValidate = (...keys)=> {
    const loginVa = [];
    keys.forEach((k)=> {
        loginVa.push(query(k).notEmpty().withMessage(`Please Enter the ${k}`))
    })
    return loginVa;
}

