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


route.post('/withG',async (req,res)=>{
    console.log("Requested ",req.body)
        const data=new userSchema({
            fullName:req.body.fullName,
            email:req.body.email,
        })

        try {
            const getedData=await userSchema.findOne({email:req.body.email});
            if(getedData)
            {
                console.log("Data already exist",getedData);
                res.status(200).json(getedData);
                return;
            }

            try {
                const saveData=await data.save();
                console.log("Saving new data",saveData);
                res.status(200).json(saveData);
            } catch (error) {
                console.log("Error in saving data of new user")
                res.status(400).json(error)
            }

        } catch (error) {
            res.status(400).json(error);
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
    if(!user.password)
    {

        console.log("Please, set a password",user);
        res.status(400).json({result:"Please, reset your password",user:user});
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


route.put('/',async(req,res)=>{
          const newPassword=cryptojs.AES.encrypt(req.body.password,process.env.key).toString();
          console.log("Passwaor hases form ",newPassword,req.body.password,req.body.email)
            try {
                   const updatedDat= await userSchema.findOneAndUpdate({email:req.body.email},{
                    $set:{ password:newPassword}
                   },{ new: true })
                   console.log("Updated data ",updatedDat);

                   res.status(200).json({result:true,updatedDat:updatedDat});
            } catch (error) {
                console.log("Error in updatingggggggggggggg");
                res.status(400).json({result:false});
            }
})


module.exports=route;