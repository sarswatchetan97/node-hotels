const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

//Menu Save endpoint
router.post('/', async (req, res) => {
  try {
    const data = req.body;

    //Create new Menu document using Mongoose Model
    const newMenu = new MenuItem(data);

    const response = await newMenu.save();
    console.log("Menu Saved");
    res.status(200).json(response);

  } catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'})
  }
});

//Menu Retrieve endpoint
router.get('/', async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log('Menu data fetched');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

//TODO: Create parameterized endpoint to get menu as per taste i.e. spicy, sweet, sour
router.get('/:tasteType', async (req, res) => {
  try {
    const tasteType = req.params.tasteType //Extract taste type from URL parameter
    if (tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour') {
      const response = await MenuItem.find({taste: tasteType});
      console.log('response fetched');
      res.status(200).json(response);
    } else {
      res.status(400).json({error: 'Invalid taste type'});
    }
  } catch (err) { 
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

//Export router so it can be used in server.js file
module.exports = router;