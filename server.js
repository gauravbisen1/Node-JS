const express = require('express');
const app = express();
const db = require('./db');
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');
require('dotenv').config();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const logRequest = (req,res,next)=>{
  console.log(`[${new Date().toDateString()}] Request made to : ${req.originalUrl}`);
  next();
}

app.use(logRequest);

app.get('/', (req, res) => {
  res.send('Node.js server!');
});

//person 
app.use('/person', personRoutes);

//menu
app.use('/menu', menuRoutes);























// app.post('/person', (req,res)=>{
//     const data = req.body;
//     const newPerson = new Person(data);
//     newPerson.save((err,savedPerson)=>{
//         if(err){
//             console.log('Error saving person:', err);
//             res.status(500).send('Error saving person');
//         }else{
//             console.log('Person saved:', savedPerson);
//             res.status(201).json(savedPerson);
//         }
//     })
// })


