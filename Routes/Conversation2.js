const route=require('express').Router();
const conversation=require('../Models/Conversation2')

//Fetching conversation of a particular user
route.get('/:userId',async(req,res)=>{
    try{
            const data=await conversation.find({members:req.params.userId});
            res.status(200).json(data);

    }catch(error)
    {
          res.status(500).json(error)
    }
})

//Saving a conversation
route.post('/',async(req,res)=>{
    const data=new conversation({
        members:[req.body.member1,req.body.member2]
    })
    console.log("Making a new conversation",req.body.member1,req.body.member2)
    try
    {
        const savedData=await data.save();
        res.status(200).json(savedData);
    }catch(error)
    {
        console.log("Erro is ",error.message)
        res.status(500).json(error)
    }
})


module.exports=route;