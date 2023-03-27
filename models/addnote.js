const { Timestamp } = require('bson');
const { timeStamp, time } = require('console');
const mongoose = require('mongoose');


const NewNote = mongoose.Schema({
    name : String,
    country : String,
    type : String
}) 

const savenote = mongoose.model('carsdata', NewNote)
module.exports= savenote;