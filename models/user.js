const mongoose = require('mongoose');


const NotesUser = mongoose.Schema({
    email : String,
    password : String,
    confirmpassword : String
}) 


const register = mongoose.model('noteusers', NotesUser)
module.exports= register