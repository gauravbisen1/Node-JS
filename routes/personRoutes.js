const express = require('express');
const router = express.Router();
const Person = require('../models/Person');
const { jwtAuthMiddleware, generateToken } = require('./../jwt');


//person
router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);

        const response = await newPerson.save();

        const payload = {
            id: response.id,
            username: response.username
        }

        const token = generateToken(payload);
        console.log("Token is", token);

        console.log("Person saved:", response);
        res.status(201).json({ response: response, token: token });
    } catch (err) {
        console.error("Error saving person:", err);
        res.status(500).json({ err: 'Error saving person' });
    }
});

//login
router.post('/login', async (req, res) => {
    try {
        //extract username and password from request body
        const { username, password } = req.body;

        //find the user in the database
        const user = await Person.findOne({ username: username });

        //if user doesn't exist or password doesn't match, return error
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ err: 'Invalid username or password' });
        }

        //generate jwt token
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        //return token as response
        res.json({ token: token });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ err: 'internal server error' });
    }
});

//profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user;
        console.log("User data:", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ err: 'Error fetching profile' });
    }

});

router.get('/', jwtAuthMiddleware, async (req, res) => {
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

//update
router.put('/:id', async (req, res) => {
    try {
        //extract the id from the url parameter
        const personId = req.params.id;
        //extract the updated data from the request body
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //return the updated document
            runValidators: true, // run mongoose validation
        });

        if (!response) {
            return res.status(404).json({ err: 'Person not found' });
        }

        console.log('Person updated:', response);
        res.status(200).json(response);
    } catch (error) {
        console.error("Error updating person:", error);
        res.status(500).json({ err: 'Error updating person' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        //extract the id from the url parameter
        const personId = req.params.id;

        //assuming you have a person model
        const response = await Person.findByIdAndDelete(personId);

        if (!response) {
            return res.status(404).json({ err: 'Person not found' });
        }

        console.log('Person deleted:');
        res.status(200).json({ message: 'Person deleted successfully' });

    } catch (error) {
        console.error("Error deleting person:", error);
        res.status(500).json({ err: 'Error deleting person' });
    }
});



module.exports = router;