/*const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
const jsonObject = JSON.parse(jsonString);
console.log(typeof jsonObject);

const objectToConvert = {
    name: "Chetan",
    age: 27
};
const jsonStringified = JSON.stringify(objectToConvert);
console.log(jsonStringified);
console.log(typeof jsonStringified)*/

const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser')
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

//const Person = require('./models/Person')
const MenuItem = require('./models/MenuItem');

app.get('/', (req, res) => {
  res.send('Welcome!.. How can I help you?')
});

//POST route to add a person
/*app.post('/person', async (req, res) => {

  try {
    const data = req.body;

    //Create a new Person document using Mongoose Model
    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);

  } catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }

});*/

//Get method to get Person data
/*app.get('/person', async (req, res) => {
  try {
    const data = await Person.find();
    console.log('data fetched');
    res.status(200).json(data);
  } catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});*/

//ToDo: Create Menu Save and Menu Retrieve endpoint
/*app.post('/menu', async (req, res) => {
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

});*/

/*app.get('/menu', async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log('Menu data fetched');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});*/

/*app.get('/person/:workType', async(req, res) => {
  
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
  
});*/

/*app.get('/sbkhicdi', (req, res) => {
  res.send('Sure sir, Sabudana Khicdi is ready...');
});

app.get('/idli', (req, res) => {
  res.send('Welcome to South India, here we serve IDLI with love');
})

app.post('/items', (req, res) => {
  res.send("Data is saved on Server");
});*/

//Import router file
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

//Use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

//const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is listiening on 3000');
});