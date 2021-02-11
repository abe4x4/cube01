var express = require('express');
var router = express.Router();
const Cube = require("../models/cube");

/* GET home page. */
router.get('/:id', function(req, res, next) {

    console.log('edit Get ID', req.params.id);
    Cube.findOne({_id:req.params.id})
    .then((thisCube)=>{
        res.render('editCubePage', { title: 'Edit Cube Page', cube:thisCube, accessories:thisCube.accessories});
    })
 
});

router.post('/:id', function(req, res, next) {

    console.log('edit Post body', req.body);

    Cube.updateOne({_id:req.params.id}, {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
       difficulty: req.body.difficultyLevel
    
    }, err => console.log('error'))

      res.redirect("/");
    
  });

module.exports = router;
