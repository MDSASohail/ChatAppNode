const mongodb=require('mongoose');
const conversationSchemma=new mongodb.Schema({
    members:{type:Array}
},{timestamps:true})

module.exports=mongodb.model("Conversation",conversationSchemma);