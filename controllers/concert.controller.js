const Concert = require('../models/concerts.model');

exports.getAll = async (req, res) => {
    try{
      res.json(await Concert.find());
    }
    catch(err) {
      res.status(500).json({message: err});
    }
  }

exports.getById = async (req, res) => {
    try {
      const crt = await Concert.findById(req.params.id);
      if (!crt) res.status(404).json({ message: 'Not found' });
      else res.json(crt);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }

exports.postOne =  async (req,res) => {
    try{
      const { id, performer, genre, price, day, image } = req.body;
      const newConcert = new Concert({id: id,  performer: performer, genre: genre, price: price, day: day, image: image});
      await newConcert.save();
      res.json({message: 'OK'});
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }

exports.changeOne = async (req, res) => {
    const { id, performer, genre, price, day, image } = req.body;
  
    try{
     const crt = await(Concert.findById(req.params.id));
     if(crt) {
      await Concert.updateOne({_id: req.params.id}, { $set: {id: id, performer: performer, genre: genre, price: price, day: day, image: image} });
      res.json({message: 'OK'});
     } 
     else res.status(404).json({message: 'Not found...'});
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }

exports.deleteOne = async (req, res) => {
    try{
      const crt = await(Concert.findById(req.params.id));
      if(crt) {
        await Concert.deleteOne({_id: req.params.id});
        res.json({message: 'OK'});
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
}

exports.findPerformer = async (req,res) => {

  try {
    const performer = await Concert.findOne({peformer: req.params.performer});
    res.json(performer)
  }
  catch(err) {
    res.status(500).json({ message: err });
    }
  }

  exports.findGenre = async (req,res) => {

    try {
      const genre = await Concert.find({genre: req.params.performer});
      res.json(genre)
    }
    catch(err) {
      res.status(500).json({ message: err });
      }
    }

exports.priceRange = async (req,res) => {
  const {priceMin, priceMax} = req.body;
  try {
    const allConcerts = await Concert.find();
    for(let concert of allConcerts) {
      if (concert.price >= priceMin && concert.price <= priceMax) {
        return concert;
      }
    }
    res.json(concert);
  }
  catch(err) {
    res.status(500).json({ message: err });
    }
  }

exports.findDay = async (req,res) => {

  try {
    const day = await Concert.find({genre: req.params.day});
    res.json(day)
  }
  catch(err) {
    res.status(500).json({ message: err });
    }
  }