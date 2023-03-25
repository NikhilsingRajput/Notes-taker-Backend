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
            else{
                res.send({"Invalid" : "plz register first"})
            }
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

router.delete('/notes/id' , async(req, res)=>{
    let id = req.body.id;
    savenote.findByIdAndDelete({id})
    if(req.body.id == savenote.id){
       await res.send({success :"id deleted "})
    }else{
        res.send({error :"Note not deleted "})

    }
})


module.exports=router