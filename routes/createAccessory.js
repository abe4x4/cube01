var express = require('express');
var router = express.Router();
const Accessory = require("../models/accessory");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('createAccessory', { title: 'Express' });
});

router.post('/', function(req, res, next) {

  console.log(req.body);

  let accessory = new Accessory({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    cubes:[]

  })

  accessory.save()
  .then((response) => {
    console.log(response);
    res.redirect("/");
  })
  
});

module.exports = router;


