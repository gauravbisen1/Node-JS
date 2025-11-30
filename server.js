const express = require('express');
const app = express();
const db = require('./db');
const Person = require('./models/Person');
const MenuItem = require('./models/MenuItem');
let port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Node.js server!');
});

app.post('/person', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);

    const savedPerson = await newPerson.save();

    console.log("Person saved:", savedPerson);
    res.status(201).json(savedPerson);
  } catch (err) {
    console.error("Error saving person:", err);
    res.status(500).json({ err: 'Error saving person' });
  }
});

app.get('/person', async (req, res) => {
  try {
    const data = await Person.find();

    console.log("Persons retrieved:", data);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error retrieving persons:", err);
    res.status(500).json({ err: 'Error retrieving persons' });
  }
});

app.post('/menu', async (req,res)=>{
  try {
      const data = req.body;
      const newMenu = new MenuItem(data);
      const response = await newMenu.save();
      console.log("Menu item saved:");
      res.status(201).json(response);
    
  } catch (error) {
      console.error("Error saving menu item:", error);
      res.status(500).json({ err: 'Error saving menu item' });
  }
});

app.get('/menu', async (req,res)=>{
  try {
      const data = await MenuItem.find();
      console.log("Menu items fetched:", data);
      res.status(200).json(data);
    
  } catch (error) {
      console.error("Error fetching menu items:", err);
      res.status(500).json({ err: 'Error fetching menu items' });
  }
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


