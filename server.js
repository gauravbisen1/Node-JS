const express = require('express');
const app = express();
const db = require('./db');
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');
require('dotenv').config();
const passport = require('./Auth');

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

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local',{session:false});

app.get('/',localAuthMiddleware, (req, res) => {
  res.send('Welcome to the Node.js server!');
});

//person 
app.use('/person',localAuthMiddleware,  personRoutes);

//menu
app.use('/menu', menuRoutes);

