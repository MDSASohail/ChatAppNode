const route=require('express').Router();
const message=require('../Models/Messages2');

//Saving message to the database
route.post('/post',async(req,res)=>{
       const data=new message({
           conversationId:req.body.conversationId,
           senderId:req.body.senderId,
           receiverid:req.body.receiverid,
           text:req.body.text
       })

       try {
             const sendData=await data.save();
             res.status(200).json(sendData);
       } catch (error) {
            res.status(500).json(error)

       }
})

route.get('/:conversationId',async(req,res)=>{
           try {
                  const data=await message.find({conversationId:req.params.conversationId});
                  res.status(200).json(data);
           } catch (error) {
                res.status(500).json(error);
           }
})


module.exports=route;