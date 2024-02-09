const express=require('express');
const mongodb=require('mongoose');
const app=express();
const http=require('http');
const {Server}=require("socket.io");
const server=http.createServer(app);

const io =new Server(server, {
    cors: {
        origin: "https://mdsasohail.github.io",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "https://mdsasohail.github.io");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });
const messageRoute=require('./Routes/Message2')
const conversationRoute=require('./Routes/Conversation2')
const userRoute=require('./Routes/User')
const dotenv=require('dotenv');
app.use(express.urlencoded({extended:true}))
app.use(express.json())
dotenv.config();

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

let users=[];

//adding user
function addUser(socketId,userId,fullName)
{
    !users.some((user)=>user._id==userId)&&users.push({socketId,_id:userId,fullName})
}

//removing a user
function removeUser(socketId)
{
    users=users.filter((user)=>user.socketId!==socketId);
}

//finding a socketid

function findSocketId(userId)
{
    // console.log("to be find is ",userId)
    return users.find((user)=>user._id===userId);
}


io.on("connection",(socket)=>{
    // console.log("A user is connected",socket.id);

    socket.on("addUser",(userId,fullName)=>{
        // console.log("User id is ",userId,fullName)
              addUser(socket.id,userId,fullName);
              io.emit("getUsers",users);
              
    })

    socket.on("saveMSG",async(data)=>{
        // console.log("Data is ",data);
        const soc=await findSocketId(data.receiverId);
        // console.log("Socket id of receiver is ",soc)
        io.to(soc?.socketId).emit("receiveMSG",data);
    })


    //
    socket.on("disconnect",()=>{
        // console.log("A user is disconnected")
        removeUser(socket.id);
        io.emit("getUsers",users);
    })
})

server.listen(8000,()=>{
    console.log("Server is started")
})

