function setTabId(tabId){
  var storage = chrome.storage.local;
  storage.get("tabIdList", function(result) {
    console.log(result.listenTabId);
    console.log("I can get listentab list in content script ");
  });
}

function backgroundWoker(listenTabId) {
  console.log(listenTabId);
  chrome.tabs.sendMessage(
    listenTabId,
    { action: "getLyrics" }, function(getLyrics) {
      // console.log(getLyrics);
      chrome.tabs.query({currentWindow: true}, function(tabs) {
        tabs.forEach(function(tab) {
          chrome.tabs.sendMessage(tab.id,{action: "UpdateDiv", lyrics: getLyrics, length: getLyrics.length }, function(response){
            console.log(response); 
            });
          });
        }
      );
      });

  }

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "Show all tabs"){
  }
  if (request.action == "Set listenTabId"){
     chrome.storage.local.set({"listenTabId":request.listenTabId},function(result){
        sendResponse({
          content: "Set listenTabId success"
        })
     })
  }

  if (request.action == "Start Timer") {
    chrome.tabs.sendMessage(request.listenTabId,{action:"Init lyricsLine"},function(){
      console.log("Init success");
    });
    var timerId = setInterval(function() {
      backgroundWoker(request.listenTabId);
    }, 1000);
    chrome.storage.local.set({"timerId":timerId})
    sendResponse({
      content: "Response from Background action: " + request.action,
    });
  }
  if (request.action == "Stop Timer") {
    chrome.storage.local.get("timerId",function(result){
      clearInterval(result.timerId);
      sendResponse({
        content: "Response from Background action: " + request.action
      });
    });
    
    chrome.tabs.sendMessage(parseInt(request.tabId), {
      action: "UpdateDiv",
      ccMessage: ""
    });
    
  }
  sendResponse({
    content: "Response from Background action: " + request.action
  });
});
