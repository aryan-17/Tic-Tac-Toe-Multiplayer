const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  },
});
io.on("connection", (socket) => {
  console.log(socket.id + " connected");

  socket.on("roomId",(room)=>{
    console.log(socket.id," joined ",room);
    socket.join(room);
    socket.on("square",(square)=>{
      socket.to(room).emit("square",square," from ",socket.id);
    })
    socket.on("count",(count)=>{
      io.to(room).emit("count",count);
    })
  })

  

  socket.on("disconnect",()=>{
    console.log("User Disconnected ", socket.id);
  })
});

httpServer.listen(4000, () => {
  console.log("Server is online on 4000");
});
