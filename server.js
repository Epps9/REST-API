const express = require('express');
const router = express.Router();
const db = require('./db');
const path = require('path');
const mongoClient = require('mongodb').MongoClient;

const testimonialsRoutes = require('./routes/testimonials.routes.js');
const concertsRoutes = require('./routes/concerts.routes.js');
const seatsRoutes = require('./routes/seats.routes.js');



mongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err){
    console.log(err);
  }
  else {
    console.log('Successfully connected to the database');

    const db = client.db('NewWaveDB');


    const app = express();

    const cors = require('cors');
    app.use(cors());

    app.use(express.urlencoded({ extended: false })); 
    app.use(express.json());
    app.use(express.static(path.join(__dirname, '/client/build')));

    app.use((req, res, next) => {
      req.db = db;
      next();
    });    

    app.use('/api', testimonialsRoutes);
    app.use('/api', concertsRoutes);
    app.use('/api', seatsRoutes);

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '/client/build/index.html'));
    });

    app.use((req, res) => {
        res.status(404).send({ message: 'Not found...' });
    });

    app.listen(process.env.PORT || 4000, () => {
      console.log('Server is running on port: 4000');
    });

  }
});



