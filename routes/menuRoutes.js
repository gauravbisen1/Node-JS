const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

router.post('/', async (req, res) => {
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

router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log("Menu items fetched:", data);
        res.status(200).json(data);

    } catch (error) {
        console.error("Error fetching menu items:", err);
        res.status(500).json({ err: 'Error fetching menu items' });
    }
});

router.get('/:taste', async (req,res)=>{
    try {
        const taste = req.params.taste;
        if (taste == 'sweet' || taste == 'sour' || taste == 'salty' || taste == 'bitter') {
            const response = await MenuItem.find({ taste: taste });
            console.log('Menu items fetched by taste type');
            res.status(200).json(response);
        } else {
            res.status(400).json({ err: 'Invalid taste type' });
        }
    } catch (error) {
        console.error("Error fetching menu items by taste type:", error);
        res.status(500).json({ err: 'Error fetching menu items by taste type' });
    }
})

module.exports = router;

