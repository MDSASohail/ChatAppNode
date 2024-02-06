const express=require('express');
const mongodb=require('mongoose');
const app=express();
const messageRoute=require('./Routes/message2')
const conversationRoute=require('./Routes/Conversation2')
const userRoute=require('./Routes/User')
const dotenv=require('dotenv');
app.use(express.urlencoded({extended:true}))
app.use(express.json())
dotenv.config();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });
async function Connect()
{
    try {
      await  mongodb.connect(process.env.mongo_pass)
        console.log("Connected to database successfully")
    } catch (error) {
        console.log(error)
    }
}

Connect();
app.use('/message',messageRoute)
app.use('/con',conversationRoute)
app.use('/user',userRoute);
app.get('*',(req,res)=>{
    res.send("Does not match any Request");
})



app.listen(8000,()=>{
    console.log("Server is started")
})