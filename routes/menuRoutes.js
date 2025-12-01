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

module.exports = router;

