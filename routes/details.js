var express = require('express');
var router = express.Router();
const Cube = require("../models/cube");

/* GET home page. */
router.get('/:id', function(req, res, next) {

    console.log('Details Get ID', req.params.id);
    Cube.findOne({_id:req.params.id}).populate('accessories')
    .then((thisCube)=>{
        res.render('details', { title: 'Express', cube:thisCube, accessories:thisCube.accessories});
    })
 
});

module.exports = router;
