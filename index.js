const imageContainer = document.querySelector("#image-container");

ipcRenderer.receiveImage((data) => {
  const imageReceived = document.createElement("img");
  imageReceived.src = data;
  imageReceived.width = 200;
  imageReceived.height = 150;

  imageContainer.appendChild(imageReceived);
  ipcRenderer.closeWindow2();
});
