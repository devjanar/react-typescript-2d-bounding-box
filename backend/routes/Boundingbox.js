var router = require('express').Router();
var Controller = require('../controllers/BoundingboxController');

// get
router.get('/', function(req, res) {
    Controller.getAll(req, res);
});
// create
router.post('/create', function(req, res) {
    Controller.create(req, res);
});
//find
router.post('/find', function(req, res) {
    Controller.findOne(req, res);
});


module.exports = router;
