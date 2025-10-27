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