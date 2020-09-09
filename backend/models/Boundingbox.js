var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Boundingbox = new Schema({

    height:{
        type:Number,
        trim: true
    },
    width:{
        type: Number,
        trim: true
    },
    imgSrc:{
        type: String,
        trim: true
    },
    strokeRect:[{
        fillText : {
            type: String,
            trim: true
        },
        fillStyle : {
            type: String,
            trim: true
        },
        font : {
            type: String,
            trim: true
        },
        lineWidth : {
            type: Number,
            trim: true
        },
        strokeStyle : {
            type: String,
            trim: true
        },
        height : {
            type: Number,
            trim: true
        },
        width : {
            type: Number,
            trim: true
        },
        last_mousex : {
            type: Number,
            trim: true
        },
        last_mousey : {
            type: Number,
            trim: true
        },
    }],

},{timestamps: true, versionKey: false});

module.exports = mongoose.model('Boundingbox', Boundingbox);