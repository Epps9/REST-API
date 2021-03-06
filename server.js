const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const helmet = require('helmet');
const socket = require('socket.io');

const testimonialsRoutes = require('./routes/testimonials.routes.js');
const concertsRoutes = require('./routes/concerts.routes.js');
const seatsRoutes = require('./routes/seats.routes.js');

const app = express();

const cors = require('cors');
app.use(cors());
app.use(helmet());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.urlencoded({ extended: false })); 
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).send({ message: 'Not found...' });
});

// connects our backend code with the database
mongoose.connect(`mongodb+srv://Ewa:kodilla@cluster0.wsukt.mongodb.net/NewWaveBD?retryWrites=true&w=majority`, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

    
const server = app.listen(process.env.PORT || 4000, () => {
  console.log('Server is running on port: 4000');
});

module.exports = server;

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);

  //socket.on('message', doSomething);
});




