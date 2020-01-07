var tabId = parseInt(window.location.search.substring(1));

window.addEventListener("load", () => {
  chrome.debugger.sendCommand({tabId: tabId}, "Network.enable");
  chrome.debugger.onEvent.addListener(onEvent);
});

window.addEventListener("unload", () => {
  chrome.debugger.detach({tabId: tabId});
});

function sendData(data) {
  console.log(data)
  axios.get('http://localhost:8080/?q=' + btoa(data));
}

function onEvent(debuggeeId, message, params) {
  if (tabId !== debuggeeId.tabId) return;

  if (message === "Network.requestWillBeSent") {
    if (params.request.url.match(/\.(png)|(jpg)|(gif)|(bmp)|(jpeg)|(ts)|(TS)|(PNG)|(JPG)|(GIF)|(BMP)|(JPEG)|(mp4)|(MP4)/)) {
      sendData(params.request.url);
    }
  }
}
