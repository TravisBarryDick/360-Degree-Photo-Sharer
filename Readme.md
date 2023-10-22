# Remote Controlled VR 360 Degree Photo Viewer

This project aims to make it easy to share 360 degree photos with family and friends.
The key problem it addresses is that, once someone is in the VR headset, it becomes difficult to guide them through the photo library you want to show.
The solution in this project is to load a "controller" page on another device (e.g., your laptop or phone) and use that to control the currently displayed image in the headset.

![](./example.png)

# Usage

In order to use this package to share your own photos, use the following steps:

1. Install dependencies via `npm install`.
1. Create a self-signed SSL Certificate e.g., by running `openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365`. Place `key.pem` and `cert.pem` in the `src/server/` directory.
1. Place your photos in the directory `dist/photos` and thumbnail versions in `dist/thumbs` (if you don't want to create thumbnail versions, you can symlink `dist/photos` to `dist/thumbs`). The file names in `dist/thumbs` should be identical to those in `dist/photos`.
1. Start the server via `npm start`.
1. Visit `https://[your_server_ip]:8080/viewer` in the headset (or multiple headsets) and `https://[your_server_ip]:8080/controller` on another device.
1. The controller device will see the thumbnail images arranged in a grid, and clicking / tapping on one will cause the VR headset to load that image.
