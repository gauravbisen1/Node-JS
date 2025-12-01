const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

//person
router.post('/', async (req, res) => {
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

router.get('/', async (req, res) => {
    try {
        const data = await Person.find();

        console.log("Persons retrieved:", data);
        res.status(200).json(data);
    } catch (err) {
        console.error("Error retrieving persons:", err);
        res.status(500).json({ err: 'Error retrieving persons' });
    }
});

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(400).json({ err: 'Invalid work type' });
        }
    } catch (error) {
        console.error("Error fetching persons by work type:", error);
        res.status(500).json({ err: 'Error fetching persons by work type' });
    }
});

module.exports = router;