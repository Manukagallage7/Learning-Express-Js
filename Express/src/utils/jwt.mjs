import jwt from 'jsonwebtoken';

export const tokenGen = (payload)=> {
    const token = jwt.sign(payload, 'process.env.JWT_SECRET')
    return token
}

export const decodeToken = (token)=> {
    const payload = jwt.decode(token)
    return payload
}