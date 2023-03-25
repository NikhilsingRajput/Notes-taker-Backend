const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./route/routers');

const app = express();
const url = "mongodb+srv://nikhilsingrajput2016:nikhil123@surveyforms.uwmob15.mongodb.net/?retryWrites=true&w=majority"

mongoose.set('strictQuery' , false);

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
   
}).then(()=>{
    console.log("connected to cloud database")
});

app.use(cors());
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use('/', router)
app.listen(5000, ()=>{
    console.log("backend is running on port 5000")
})