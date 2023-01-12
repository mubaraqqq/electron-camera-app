const video = document.getElementById("camera");
const captureButton = document.getElementById("capture-image");
const image = document.getElementById("image");

navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  video.srcObject = stream;
});

captureButton.addEventListener("click", () => {
  const canvas = document.createElement("canvas");

  canvas.width = video.width;
  canvas.height = video.height;

  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

  const dataUrl = canvas.toDataURL();
  image.src = dataUrl;
  // console.log(dataUrl);
  new Notification("Image Captured", {
    body: "Image successfully captured from Live Video",
  });
  ipcRenderer.sendImage(dataUrl);
});

// ipcRenderer.receiveImage((data) => {
//   console.log(data, "received");
// });

// console.log(ipcRenderer, window.ipcRenderer);
