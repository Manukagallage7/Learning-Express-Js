import { verifyToken } from "./jwt.mjs";

export const checkAuth = (req, res, next)=> {
    const auth = req.headers.authorization;
    if(!auth){
        return res.sendStatus(401).json({
            msg: "error",
            error: "token not found",
            data: null,
        })
    }

    const parts = auth.split(' ');
    if (parts[0] !== 'Bearer' || !parts[1]) {
        return res.status(401).json({
            msg: "error",
            error: "invalid token format",
            data: null,
        });
    }

    const token = parts[1];

    const payload = verifyToken(token)

    if(!payload){
        return res.status(401).json({
            msg: "error",
            error: "token expired",
            data: null,
        })
    }

    req.user = payload;
    next()
}