const http = require("http");
const express = require("express");
const { Server } = require("socket.io"); // Correct import statement

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Connected: ", socket.id);

  socket.on("on-client-connect", () => {
    socket.broadcast.emit("get-editor-state");
  });

  socket.on("editor-state", (code) => {
    socket.broadcast.emit("editor-state-from-server", code);
  });

  socket.on("code-change", (code) => {
    socket.broadcast.emit("code-change", code);
  });
});

server.listen(8000, () => {
  console.log("Server listening on PORT: 8000");
});
