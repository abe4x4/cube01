var express = require('express');
var router = express.Router();
const Cube = require("../models/cube");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('create', { title: 'Express' });
});

router.post('/', function(req, res, next) {

  console.log(req.body);

  let cube = new Cube({
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    difficulty: req.body.difficultyLevel

  })

  cube.save()
  .then((response) => {
    console.log(response);
    res.redirect("/");
  })
  
});

module.exports = router;


