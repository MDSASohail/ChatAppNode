const route=require('express').Router();
const message=require('../Models/Messages2');

//Saving message to the database
route.post('/post',async(req,res)=>{
       const data=new message({
           conversationId:req.body.conversationId,
           senderId:req.body.senderId,
           receiverId:req.body.receiverId,
           text:req.body.text
       })

       try {
             const sendData=await data.save();
             res.status(200).json(sendData);
       } catch (error) {
          console.log("Error in saving message is ",error.message)
            res.status(500).json({result:error.message})

       }
})

route.post('/delete',async(req,res)=>{
       console.log("Reques for deleting a conversations",req.body.data.conversationId);

        try {
              const deletedData=await message.deleteMany({conversationId:req.body.data.conversationId});
              console.log(deletedData);
              res.status(200).json({result:true});
        } catch (error) {
              console.log("Error in deleting");
              res.status(500).json({result:false})
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