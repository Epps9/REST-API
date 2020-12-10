const express = require('express');
const router = express.Router();
const db = require('./db');

const testimonialsRoutes = require('./routes/testimonials.routes.js');
const concertsRoutes = require('./routes/concerts.routes.js');
const seatsRoutes = require('./routes/seats.routes.js')
const cors = require('cors')

const app = express();


app.use(cors());


app.use(express.urlencoded({ extended: false })); 
app.use(express.json());

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);


app.use((req, res) => {
    res.status(404).send({ message: 'Not found...' });
});

app.listen(4000, () => {
  console.log('Server is running on port: 4000');
});
