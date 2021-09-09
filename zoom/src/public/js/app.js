const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open",()=>{
    console.log("connected");
})

socket.addEventListener("message",(message)=>{
    console.log(message.data);
});

socket.addEventListener("close",()=>{
    console.log("disconnected");
});