const mongose=require('mongoose');
const message=new mongose.Schema({
    conversationId:{type:String, required:true},
    senderId:{type:String,required:true},
    text:{type:String,required:true}
},{timestamps:true})

module.exports=mongose.model("Messages",message);