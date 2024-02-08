const route=require('express').Router();
const userSchema=require('../Models/User')
const cryptojs=require('crypto-js');
route.post('/',async(req,res)=>{
    const passwordSecure=cryptojs.AES.encrypt(req.body.password,process.env.key).toString();
    // console.log("In user Post")
    const data=new userSchema({
        fullName:req.body.fullName,
        email:req.body.email,
        password:passwordSecure
    })
    try {
        const savedData=await data.save();
        res.status(200).json(savedData);
    } catch (error) {
        res.status(500).json(error)
    }
})

route.post('/get',async(req,res)=>{
    const user= await userSchema.findOne({email:req.body.email});
    // console.log("Email is ",req.body.email)
    // console.log("User is ",user)
    // console.log("Password is ",user.password)
    if(!user)
    {
        res.status(500).json({result:"User does't exist"})
        return;

    }
    
    const passwordSecure=cryptojs.AES.decrypt(user.password,process.env.key).toString(cryptojs.enc.Utf8)
    // console.log("Password is ",req.body.password)
    // console.log("Secure password is ",passwordSecure)
    if(passwordSecure!==req.body.password)
     {
        res.status(400).json({result:"Incorrect Password"})
        return;
     }

     res.status(200).json(user);
})

route.get('/',async(req,res)=>{
    try {
        const allusers=await userSchema.find();
        res.status(200).json(allusers);
    } catch (error) {
        res.status(500).json({result:"Fail in  fetching users"})
    }
})


module.exports=route;