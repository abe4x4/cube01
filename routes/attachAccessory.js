var express = require('express');
var router = express.Router();
const Cube = require("../models/cube");
const Accessory = require("../models/accessory");

/* GET home page. */
router.get('/:id', function(req, res, next) {

    console.log(req.params.id);
    Cube.findOne({_id:req.params.id}).populate('accessories')
    .then((thisCube)=>{

        let idArr = thisCube.accessories.map(a => {return a._id;});
        Accessory.find(
            
        )
        .then((foundAccessories)=>{
            let dropdownAccessories = foundAccessories.filter(acc => !idArr.includes(acc._id));
            res.render('attachAccessory', { title: 'Express', cube:thisCube, dropdownAccessories: dropdownAccessories});
        })
        
    })
 
});

router.post('/:id', function(req, res, next) {
    let selAccId = req.body.accessory;
    let cubeId = req.params.id;
  console.log(req.body);

    Cube.findOneAndUpdate (
        {_id:cubeId},
        {$push: {"accessories": selAccId}},
        {upsert: true},
        function (err){
            if (err){console.log(err)}
        }
    )

    Accessory.findOneAndUpdate (
        {_id:selAccId},
        {$push: {"cubes": cubeId}},
        {upsert: true},
        function (err){
            if (err){console.log(err)}
        }
    )
    res.redirect(`/details/${cubeId}`);
});

module.exports = router;


