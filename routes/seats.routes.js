const express = require('express');
const router = express.Router();
const db = require('../db');
const { uuid } = require('uuidv4');
const Seat = require('../models/seats.model');


router.route('/seats').get((req, res)=> {
    res.json(db.seats);
});


router.route('/seats/:id').get((req, res) => {
    const element = db.seats.filter(
        (element) => element.id === parseInt(req.params.id)
    );
    res.json(element)
});

router.route('/seats').post((req, res) => {
    const { day, seat, client, email} = req.body

    const newSeat = {
        id: uuid(),
        day,
        seat,
        client,
        email
    };

    db.seats.push(newSeat);

    return res.json({message: 'OK'});
})

router.route('/seats/:id').delete((req, res) => {
    const element = db.seats.filter(
      (element) => element.id === parseInt(req.params.id)
    );
    const index = db.seats.indexOf(element);
    db.seats.splice(index, 1);
  
    return res.json({ message: 'OK' });
  });

router.route('/seats/:id').put((req, res) => {
    const { day, seat, client, email } = req.body;
    const element = db.seats.filter(
        (element) => element.id === parseInt(req.params.id)
    );
    const index = db.seats.indexOf(element);
    const newSeat = {
        day: req.params.day,
        seat: req.params.seat,
        client: req.params.client,
        email: req.params.email,
    };
    db.seats.splice(index, 1, newSeat);

    return res.json({ message: 'OK' });
});


module.exports = router;