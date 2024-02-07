const mongose=require('mongoose');
const conversation=new mongose.Schema(
    {
        members:{type:Array}
    },{timestamps:true}
);


module.exports=mongose.model("Conversation2",conversation);