const user=require('mongoose');
const userS=new user.Schema({
    fullName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
},{timestamps:true});



module.exports=user.model("Users",userS);
