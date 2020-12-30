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
     await Concert.updateOne({_id: req.params.id}, { $set: {id: id, performer: performer, genre: genre, price: price, day: day, image: image} });
     res.json({message: 'OK'});
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