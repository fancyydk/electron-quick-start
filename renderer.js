// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron');

let fileUrl = document.querySelector('#fileUrl');
let openDownloadWindow = document.querySelector('#openDownloadWindow');
openDownloadWindow.addEventListener('click', (e) => {
    if (!fileUrl.value) {
        alert('Please enter a file URL');
        fileUrl.focus();
        return;
    }

    ipcRenderer.send('open-download-window', fileUrl.value);
});