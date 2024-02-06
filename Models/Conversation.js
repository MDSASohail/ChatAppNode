const mongodb=require('mongoose');
const conversationSchemma=new mongodb.Schema({
    members:{type:Array,unique:true}
},{timestamps:true})

module.exports=mongodb.model("Conversation",conversationSchemma);