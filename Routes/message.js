const route=require('express').Router();

const messageSchemma=require('../Models/Message')
route.post('/',async(req,res)=>{

    //    const data=req.body;
    //    console.log(data)
    //    res.json(data);
       const me=new messageSchemma({
        senderId:req.body.senderId,
        conversationId:req.body.conversationId,
        text:req.body.text,
        receiverId:req.body.receiverId
       })


       try{
             const savedMSG=await me.save();
             res.status(200).json(savedMSG)
       }catch(err)
       {
          res.status(500).json(err)
       }
})


route.get('/:conversationId',async(req,res)=>{
    try{
        const conver=await conversationSchemma.find({conversationId:req.params.conversationId})
        
        res.status(200).json(conver)
    }catch(err){
       res.status(500).json(err);
    }
})

module.exports=route;