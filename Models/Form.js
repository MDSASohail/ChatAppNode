const FormSchemma=require('mongoose');

const f=new FormSchemma.Schema({
    fullName:{type:String,require:true},
    email:{type:String,require:true},
    gender:{type:String,require:true},
    DOB:{type:String,require:true},
    message:{type:String,require:true}
},{timestamps:true});

module.exports=FormSchemma.model("forms",f);