import express from 'express';

const server = express();

server.get('/', (req, res) => {
    console.log(req)
    res.send('Hello World!'); // Send a response to the client using
})

server.listen(5000, ()=> {
    console.log('Server is running on http://localhost:5000');
})
