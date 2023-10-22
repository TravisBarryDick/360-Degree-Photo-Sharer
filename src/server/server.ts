import fs from "fs";
import express from "express";
import { createServer } from "node:https";
import { Server, Socket } from "socket.io";
import path from "path";

const app = express();

const server = createServer(
  {
    key: fs.readFileSync(__dirname + "/key.pem"),
    cert: fs.readFileSync(__dirname + "/cert.pem"),
    passphrase: "testdev",
  },
  app
);
const io = new Server(server);

app.use(express.static("dist/photos", { maxAge: 1000 * 60 * 60 * 24 }));
app.use(express.static("dist/"));

app.get("/viewer", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "../../dist/viewer.html"));
});

app.get("/controller", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "../../dist/controller.html"));
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("controller-message", (message) => {
    io.emit("viewer-message", message);
  });

  socket.on("get-files", () => {
    let files = fs.readdirSync(path.resolve(__dirname, "../../dist/photos/"));
    files = files.filter((path) => path.endsWith(".jpg"));
    let images_and_thumbs = files.map((filename) => ({
      image: "/photos/" + filename,
      thumb: "/thumbs/" + filename,
    }));
    socket.emit("file-list", images_and_thumbs);
  });

  socket.on("select-image", (path) => {
    console.log(`Selected image ${path}.`);
    io.emit("select-image", path);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(8080, () => {
  console.log("Viewer:     https://localhost:8080/viewer");
  console.log("Controller: https://localhost:8080/controller");
});
