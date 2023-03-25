const { Timestamp } = require('bson');
const { timeStamp, time } = require('console');
const mongoose = require('mongoose');


const NewNote = mongoose.Schema({
    title : String,
    description : String,
    time : String
}) 

const savenote = mongoose.model('allnotes', NewNote)
module.exports= savenote;