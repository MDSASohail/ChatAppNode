const route=require('express').Router();
const form=require('../Models/Form');
route.post('/',async(req,res)=>{
    const data=new form({
        fullName:req.body.fullName,
        email:req.body.email,
        DOB:req.body.DOB,
        gender:req.body.gender,
        message:req.body.message
    });
    if(data.fullName=="")
        {
            res.status(400).json({result:false});
            return;
        }
    try {
        const savedData=await data.save();
        console.log(savedData);
        res.status(200).json({result:true});
    } catch (error) {
        console.log("Error in saving form",error);
        res.status(500).json({result:false});
    }
})

module.exports=route;