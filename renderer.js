// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {ipcRenderer} = require('electron');

let shouldMinimizeChkbx = document.querySelector('#shouldMinimize');
let restartInFiveBtn = document.querySelector('#restartInFive');
restartInFiveBtn.addEventListener('click', () => ipcRenderer.send('restartInFive', shouldMinimizeChkbx.checked));