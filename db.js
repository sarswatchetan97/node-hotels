const mongoose = require('mongoose');
require('dotenv').config();

//const mongoURL = 'mongodb://127.0.0.1:27017/hotels';
const mongoURL = process.env.MONGODB_URL;   

mongoose.connect(mongoURL, {
    useNewURLParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = db;