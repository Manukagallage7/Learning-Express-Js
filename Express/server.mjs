import express from 'express';

const server = express();

server.get('/', (req, res) => {
    console.log(req)
    res.json({
        msg: 'Hello World'
    }); // Send a response to the client using
})

server.get('/api/v1/users', (req, res) => {
    res.status(200).json({
        msg: 'User list'
    })
})

server.listen(5000, ()=> {
    console.log('Server is running on http://localhost:5000');
})
