const express=require('express');
const mongodb=require('mongoose');
const app=express();
const messageRoute=require('./Routes/message')
const conversationRoute=require('./Routes/Conversation')
const dotenv=require('dotenv');
app.use(express.urlencoded({extended:true}))
app.use(express.json())
dotenv.config();
mongodb.connect(process.env.mongo_pass).then((err)=>{console.log("Connected successfylly")}).catch(()=>{console.log(err)})
app.use('/message',messageRoute)
app.use('/con',conversationRoute)
app.get('/',(req,res)=>{
    res.send("Hello");
})

app.listen(8000,()=>{
    console.log("Server is started")
})