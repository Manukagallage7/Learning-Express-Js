import jwt from 'jsonwebtoken';

export const tokenGen = (payload)=> {
    const token = jwt.sign(payload, JWT_SECRET);
    return token;
};

export const decodeToken = (token)=> {
    const payload = jwt.decode(token);
    return payload;
};

export const verifyToken = (token)=> {
    const payload = jwt.verify(token, JWT_SECRET)
    return payload;
}