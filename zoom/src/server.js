import http from "http"
import express from "express"
import Websocket from "ws"


const app = express();

app.set("view engine", "pug");
app.set("views", __dirname+"/views");
app.use("/public", express.static(__dirname+"/public"));
app.get("/",(req,res)=>{
    res.render("home");
});
app.get("/*",(req,res)=>{
    res.redirect("/");
});

const handleListen = () => console.log("http://localhost:3000");

const server = http.createServer(app);
const wss = new Websocket.Server({server});

wss.on("connection",(socket)=>{
    console.log("connected");
    socket.on("close",()=>{
        console.log("disconnected");
    });
    socket.on("message", (message)=>{
        console.log(message);
    });
    socket.send("hello");
});

server.listen(3000,handleListen);