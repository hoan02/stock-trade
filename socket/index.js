import http from 'http';
import { Server } from "socket.io";
import express from "express";

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: true,
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when connect
  console.log(`A client connected: ${socket.id}`);

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    console.log(users)
    io.emit("getUsers", users);
  });


  //send and get message
  socket.on("matchOrder", ( idMatch ) => {
    try {
      const user = getUser(idMatch);
      io.to(user.socketId).emit("getMessage", {
        message: "ô sờ kê"
      });
    } catch (error) {
      console.log(error)
    }
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("A client disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(8900, () => {
  console.log('Socket listening on: http://localhost:8900');
});
