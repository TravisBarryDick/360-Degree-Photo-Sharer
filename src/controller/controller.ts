import io from "socket.io-client";

const socket = io();

socket.on("connect", () => {
  socket.emit("get-files");
});

let current: HTMLImageElement | undefined = undefined;

socket.on("file-list", (files: Array<{ image: string; thumb: string }>) => {
  populate_images(files);
});

function remove_children(node: HTMLElement) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

function create_image(paths: { image: string; thumb: string }) {
  const image = document.createElement("img") as any as HTMLImageElement;
  image.setAttribute("src", paths.thumb);
  image.onclick = () => {
    if (current) current.style.borderColor = "black";
    current = image;
    image.style.borderColor = "green";
    socket.emit("select-image", paths.image);
  };
  return image;
}

function populate_images(images: Array<{ image: string; thumb: string }>) {
  const div = document.getElementById("images") as HTMLDivElement;
  remove_children(div);
  for (const paths of images) div.appendChild(create_image(paths));
}
