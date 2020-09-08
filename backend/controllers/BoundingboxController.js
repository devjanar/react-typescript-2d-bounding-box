var Model = require('../models/Boundingbox');

module.exports =  {

    create : function (req, res) {
        if(req.body && req.body!=null) {
            Model.create(req.body, function (err, success) {
                if (!err) {
                    res.status(200).json(success);
                }
                else {
                    res.status(400).json("Error Message => ",err )
                }
            });
        }
    },
    findOne : function (req,res) {
        if(req.body && req.body.id) {
            Model.findById({_id: req.body.id}, function (err, success) {
                if (!err) {
                    res.status(200).json(success);
                }
                else {
                    res.status(400).json("Error Message => ",err )
                }
            });
        }
    },
    getAll : function (req, res){
        Model.find({}).sort({'createdAt': -1}).exec(function(err, success) {
            if (!err) {
                res.status(200).json(success);
            }
            else {
                res.status(400).json("Error Message => ",err )
            }
        });
    },

};