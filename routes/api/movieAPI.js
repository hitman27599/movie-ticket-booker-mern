const express = require('express');
const router = express.Router();

const Movie = require('../../models/movie');

//GET all movies
router.get('/',(req,res)=>{
    
    Movie.find({},(err,movie)=>{
        if(err){
            res.status(500).send(err)
        }
        res.status(201).send(movie)
    })
    
});

//GET movie with id
router.get('/:id',(req,res)=>{
    Movie.findById(req.params.id,(err,movie)=>{
        if(err){
            res.status(500).send(err)
        }
        res.status(201).send(movie)
    })
});


//POST movie
router.post('/',(req,res)=>{
    
    const newMovie = new Movie({
        name : req.body.name,
        date : req.body.date,
        time : req.body.time,
        image : req.body.image,
        seats: req.body.seats
    });
    newMovie.save()
        .then(movie=>{
            res.send("movie saved");
        })
        .catch(err => {
            res.status(400).send(err);
        })
});

//POST serach movie
router.post('/search',(req,res)=>{
    const name = req.body.name;
    const expression = `/${name}/i`;
    console.log(expression);
    var query = {name :{$regex: name,$options : 'i'}}
    Movie.findOne(query,(err,movie)=>{
        if(err){
            res.status(500).send(err)
        }
        res.status(201).send(movie)
    });
});

router.put('/:id',(req,res)=>{
    Movie.findByIdAndUpdate(req.params.id,{seats:req.body.seats},(err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
})

//delete movie
router.delete('/:id',(req,res)=>{
    Movie.findByIdAndDelete(req.params.id,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

//delete all movies
router.delete('/',(req,res)=>{
    Movie.deleteMany({},(err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send("deleted all movies");
        }
    })
})


module.exports = router;