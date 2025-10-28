import jwt from 'jsonwebtoken';

export const tokenGen = (payload)=> {
    const token = jwt.sign(payload, "mykey123",);
    return token;
};

export const decodeToken = (token)=> {
    const payload = jwt.decode(token);
    return payload;
};

export const verifyToken = (token)=> {
    try{
        const payload = jwt.verify(token, "mykey123")
        return payload;
    } catch(error){
        console.log("Invalid Token");
        return null;
    }
}