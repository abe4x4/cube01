var express = require('express');
var router = express.Router();
const Cube = require("../models/cube")

/* GET home page. */
router.get('/', function(req, res, next) {
  Cube.find()
  .then((response)=> {
    res.render('index', { title: 'Express', cube : response });
  })
  .catch((error) => console.log('error', error));
});

module.exports = router;
