var tabId = parseInt(window.location.search.substring(1));

window.addEventListener("load", () => {
  chrome.debugger.sendCommand({tabId: tabId}, "Network.enable");
  chrome.debugger.onEvent.addListener(onEvent);
  sendData('start-here');
});

window.addEventListener("unload", () => {
  chrome.debugger.detach({tabId: tabId});
});

String.prototype.hexEncode = function(){
    var hex, i;

    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result
}

function sendData(data) {
  axios.get('http://localhost:8080/' + data.split("").map((x)=> x.charCodeAt(0)).join("-"));
}

function onEvent(debuggeeId, message, params) {
  if (tabId !== debuggeeId.tabId)
    return;

  if (message === "Network.requestWillBeSent") {
    if (params.request.url.match(/\.(jpg)|(xpng)/)) {
      sendData(params.request.url);

      // var div = document.createElement("div");
      // div.textContent = params.request.url;
      // console.log(params);
      // document.getElementById("container").appendChild(div);
    }
  }
}
