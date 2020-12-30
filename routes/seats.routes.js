const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controller');


router.get('/seats', SeatController.getAll);

router.get('/seats/:id', SeatController.getById);
  
router.post('/seats', SeatController.postOne);

router.put('/departments/:id', SeatController.changeOne);

router.delete('/departments/:id', SeatController.deleteOne);


module.exports = router;