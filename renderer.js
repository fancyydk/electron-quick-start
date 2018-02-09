// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron');

let zoomLevel = 0;
let zoomFactor = 1;
let zoomLevelPlus = document.querySelector('#zoomLevelPlus');
let zoomLevelMinus = document.querySelector('#zoomLevelMinus');
let zoomLevelStep = document.querySelector('#zoomLevelStep');
let zoomFactorPlus = document.querySelector('#zoomFactorPlus');
let zoomFactorMinus = document.querySelector('#zoomFactorMinus');
let zoomFactorStep = document.querySelector('#zoomFactorStep');
let resetZoom = document.querySelector('#resetZoom');
let zoomLevelSpan = document.querySelector('#zoomLevel');
let zoomFactorSpan = document.querySelector('#zoomFactor');
let changeDiv = document.querySelector('#change');

let zoomLevelChange = zoomLevelStep.value;
let zoomFactorChange = zoomFactorStep.value;

zoomLevelStep.addEventListener('change', () => zoomLevelChange = zoomLevelStep.value);
zoomFactorStep.addEventListener('change', () => zoomFactorChange = zoomFactorStep.value);

let changeZoomLevel = (change) => {
    zoomLevel += change;
    console.log('Sending zoom level: ' + zoomLevel);
    ipcRenderer.send('changeZoomLevel', zoomLevel);
    changeDiv.innerHTML = 'Zoom level was modified';
};
let changeZoomFactor = (change) => {
    zoomFactor += change;
    console.log('Sending zoom factor: ' + zoomFactor);
    ipcRenderer.send('changeZoomFactor', zoomFactor);
    changeDiv.innerHTML = 'Zoom factor was modified';
};

resetZoom.addEventListener('click', () => {
    zoomLevel = 0;
    zoomFactor = 1;
    changeZoomLevel(0);
});

zoomLevelPlus.addEventListener('click', () => changeZoomLevel(1 * zoomLevelChange));
zoomLevelMinus.addEventListener('click', () => changeZoomLevel(-1 * zoomLevelChange));
zoomFactorPlus.addEventListener('click', () => changeZoomFactor(1 * zoomFactorChange));
zoomFactorMinus.addEventListener('click', () => changeZoomFactor(-1 * zoomFactorChange));

ipcRenderer.on('zoomChanged', (event, newZoomLevel, newZoomFactor) => {
    zoomLevelSpan.innerHTML = newZoomLevel;
    zoomFactorSpan.innerHTML = newZoomFactor;
    zoomLevel = newZoomLevel;
    zoomFactor = newZoomFactor;
});