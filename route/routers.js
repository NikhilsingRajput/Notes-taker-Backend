const express = require('express');
const savenote = require('../models/addnote');
const register = require('../models/user');
const router = express.Router();


router.post('/' , (req , res)=>{
    const newuser = new register({
        email : req.body.email,
        password : req.body.password,
        confirmpassword : req.body.confirmpassword
    });
   
     newuser.save();
     res.send({success : "data added to database"})
})

router.get('/', (req, res)=>{
   savenote.find()
   .then(response =>{
    res.json({
        response
    })
   })
   
})

router.post('/signin' , async(req, res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const checkdata = await register.findOne({ email : email });
        if(checkdata){
            if(checkdata.password == password ){
            res.send({succes : " sign in Success"})}
        }else{
            res.status(400)
        }
        
    } catch (error) {
        res.send({error})
    }
})

router.post('/savenote', (req , res)=>{
    const newnote = new savenote({
        title : req.body.title,
        description : req.body.description,
        time : new Date().toGMTString()
    });
    
     newnote.save();
     
     res.send({success : "New note added to database"})
})

router.delete('/notes/id' , (req, res)=>{
    let id = req.body.id;
    savenote.findByIdAndRemove({_id : id})
    .then(()=>{
        res.json({
            message : "id deleted Successfully"
        })
    }).catch(error =>{
        res.json({
            message : error
        })
        res.status(400)
    })
})

router.patch("/notes/id" , (req, res)=>{
    let id = req.body.id;
    let updatedData= {
        title: req.body.title,
        description: req.body.description,
        time : new Date().toGMTString()
        
    }

    savenote.findByIdAndUpdate(id , updatedData)
    .then(()=>{
        res.json({
            message : "Data updated Successfully"
        })
    }).catch(error =>{
        res.json({
            message : error
        })
        res.status(400)
    })
})


module.exports=router