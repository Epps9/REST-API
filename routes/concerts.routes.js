const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concert.controller');


router.get('/concerts', ConcertController.getAll);

router.get('/concerts/:id', ConcertController.getById);

router.post('/concerts', ConcertController.postOne);

router.put('/concerts/:id', ConcertController.changeOne);
  
router.delete('/concerts/:id', ConcertController.deleteOne);

router.get('/concerts/performer/:performer', ConcertController.findPerformer);

router.get('/concerts/genre/:genre', ConcertController.findGenre);

router.get('/concerts/genre/:genre', ConcertController.priceRange);

router.get('/concerts/genre/:genre', ConcertController.findDay);


module.exports = router;  
