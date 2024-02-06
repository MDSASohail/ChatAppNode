const mongose=require('mongoose');
const conversation=new mongose.Schema(
    {
        members:{type:Array,unique:true}
    },{timestamps:true}
);

module.exports=mongose.model("Conversation",conversation);