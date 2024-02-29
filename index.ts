import http from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: any) => {
  console.log("Connected: ", socket.id);

  socket.on("on-client-connect", () => {
    socket.broadcast.emit("get-editor-state");
  });

  socket.on("editor-state", (code: string) => {
    socket.broadcast.emit("editor-state-from-server", code);
  });

  socket.on("code-change", (code: string) => {
    socket.broadcast.emit("code-change", code);
  });
});

server.listen(8000, () => {
  console.log("Server listening on PORT: 8000");
});
