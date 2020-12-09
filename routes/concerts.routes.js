const express = require('express');
const { uuid } = require('uuidv4');
const router = express.Router();
const db = require('../db');

router.route('/concerts').get((req, res) => {
    res.send(db.concerts);
});

router.route('/concerts/:id').get((req,res) => {
    const element = db.concerts.find( (element) => element.id === parseInt(req.params.id));
    res.send(element);
});

router.route('/concerts/:id').post((req, res) => {
    const {id, performer, genre, price, day, image } = req.body;

    const concert = {
        id: uuid(),
        performer, 
        genre, 
        price, 
        day, 
        image
    };

    db.concerts.push(concert);

    return res.json({message: 'OK'});
})






module.exports = router;  
