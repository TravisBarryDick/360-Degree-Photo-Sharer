import "aframe";
import { io } from "socket.io-client";

const socket = io();

socket.on("select-image", (path) => {
  const sky = document.getElementById("sky");
  sky?.setAttribute("src", path);
});
