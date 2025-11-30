const express = require('express');
const app = express();
const db = require('./db');
const Person = require('./models/Person');
let port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);                      
});

app.get('/', (req,res)=>{
    res.send('Node.js server!');
});

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
app.post('/person', async (req, res) => {
    try {
      const data = req.body;
      const newPerson = new Person(data);
  
      const savedPerson = await newPerson.save();   // no callback
      console.log("Person saved:", savedPerson);
      res.status(201).json(savedPerson);
    } catch (err) {
      console.error("Error saving person:", err);
      res.status(500).send("Error saving person");
    }
  });
  

 
