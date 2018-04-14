
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.debugger.attach({tabId:tab.id}, version,
    onAttach.bind(null, tab.id));
});

var version = "1.0";

function onAttach(tabId) {
  if (chrome.runtime.lastError) {
    // console.log(".");
    // var notification = webkitNotifications.createNotification('Hello!', chrome.runtime.lastError.message);
    return;
  }
  chrome.windows.create({url: "headers.html?" + tabId, type: "popup", width: 150, height: 500});
}
