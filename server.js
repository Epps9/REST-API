const express = require('express');
const db = require('./db');
const testimonialsRoutes = require('./routes/testimonials.routes.js');
const concertsRoutes = require('./routes/concerts.routes');

const app = express();

app.use(express.urlencoded({ extended: false })); 
app.use(express.json());

app.use('/', testimonialsRoutes);
app.use('/', concertsRoutes);


app.use((req, res) => {
    res.status(404).send({ message: 'Not found...' });
});

app.listen(4000, () => {
  console.log('Server is running on port: 4000');
});
