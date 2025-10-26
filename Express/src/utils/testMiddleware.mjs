const testMiddleware = (req, res, next) => {
    console.log('1')
    if(req.method === 'GET'){
        return next()
    }
    res.sendStatus(201)
}

export default testMiddleware;