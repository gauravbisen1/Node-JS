const express = require('express');
const app = express();
const db = require('./db');
let port = 3000;

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);                      
});

app.get('/', (req,res)=>{
    res.send('Hello World from Node.js server!');
});

app.get('/test', (req,res)=>{
    res.send('This is a test endpoint.');
})
