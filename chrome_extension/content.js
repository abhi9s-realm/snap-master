let startPoint = null;
let endPoint = null;
let selectionDiv = null;

function onMouseDown(e) {
  startPoint = { x: e.pageX, y: e.pageY };
  selectionDiv = document.createElement('div');
  selectionDiv.style.border = '2px dashed red';
  selectionDiv.style.position = 'fixed';
  selectionDiv.style.pointerEvents = 'none';
  selectionDiv.style.zIndex = '9999';
  selectionDiv.style.left = `${startPoint.x}px`;
  selectionDiv.style.top = `${startPoint.y}px`;
  document.body.appendChild(selectionDiv);
  document.addEventListener('mousemove', onMouseMove);
}

function onMouseMove(e) {
  endPoint = { x: e.pageX, y: e.pageY };
  selectionDiv.style.width = `${Math.abs(endPoint.x - startPoint.x)}px`;
  selectionDiv.style.height = `${Math.abs(endPoint.y - startPoint.y)}px`;
  selectionDiv.style.left = `${Math.min(startPoint.x, endPoint.x)}px`;
  selectionDiv.style.top = `${Math.min(startPoint.y, endPoint.y)}px`;
}

function onMouseUp(e) {
  document.removeEventListener('mousemove', onMouseMove);
  document.body.removeChild(selectionDiv);
  chrome.runtime.sendMessage({ type: 'capture', coordinates: { startPoint, endPoint } });
  startPoint = endPoint = null;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'startCapture') {
    document.body.style.cursor = 'crosshair';
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
  }
  if (message.type === 'stopCapture') {
    document.body.style.cursor = '';
    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mouseup', onMouseUp);
  }
});
