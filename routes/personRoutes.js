const express = require('express');
const router = express.Router();
const Person = require('./../models/Person')
const {jwtAuthMiddleware, generateToken} = require('./../jwt')

//POST route to add a person
router.post('/signup', async (req, res) => {  //creating usecase of signup endpoint

  try {
    const data = req.body;

    //Create a new Person document using Mongoose Model
    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log('data saved');

    const payload = {
      id: response.id,
      username: response.username
    }

    console.log("Payload: ", JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is: ", token);

    res.status(200).json({response: response, token: token});

  } catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }

});

//Get method to get Person data
router.get('/', async (req, res) => {
  try {
    const data = await Person.find();
    console.log('data fetched');
    res.status(200).json(data);
  } catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

//Parameterized endpoint to get data as per worktype
router.get('/:workType', async(req, res) => {
  
  try {
    const workType = req.params.workType; //Extract the work type from the URL parameter
    if (workType == 'Chef' || workType == 'Waiter' || workType == 'Manager') 
    {
      const response = await Person.find({work: workType});
      console.log('response fetched');
      res.status(200).json(response);
    } else 
    {
      res.status(404).json({error: 'Invalid work type'});
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
  
});

//Update person data endpoint
router.put('/:id', async(req, res) => {
  
  try {
    const personId = req.params.id; //Extract the id from URL parameter
    const updatedPersonData = req.body; //Updated data for person

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true, //Return the updated document
      runValidators: true //Run Mongoose validation
    });

    if(!response) {
      return res.status(404).json({error: 'Person not found'});
    }

    console.log('data updated');
    res.status(200).json(response);

  } catch(err) {
    console.log('err');
    res.status(500).json({error: 'Internal Server Error'});
  }
  
});

router.delete('/:id', (req, res) => {
  try {
    const personID = req.params.id; // Extract Person ID from URL parameter

    const response = Person.findByIdAndDelete(personID);

    if(!response) {
      return res.status(400).json({error: 'Person not found'});
    }

    console.log('data deleted');
    res.status(200).json({message: 'Person Deleted Successfully'});

  } catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

module.exports = router;