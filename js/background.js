function backgroundWoker(listenTabId,tabId){
    chrome.tabs.sendMessage(parseInt(listenTabId),{action:"getLyrics"}, function(response) {
        var ccMessageFL=response.ccMessage.dataFL;
        var ccMessageSL=response.ccMessage.dataSL;
        if (ccMessageFL==undefined){
            ccMessageFL=null
        }
        if (ccMessageSL==undefined){
            ccMessageSL=null
        }
        chrome.tabs.sendMessage(parseInt(tabId),{action:"UpdateDiv",id:"ccViewFL",ccMessage:ccMessageFL}, function(res) {
          });
        chrome.tabs.sendMessage(parseInt(tabId),{action:"UpdateDiv",id:"ccViewSL",ccMessage:ccMessageSL}, function(res) {
          });
      });

}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action=="Start Timer"){
        var timerId = setInterval(function(){ backgroundWoker(request.listenTabId,request.tabId) }, 250);
        sendResponse({ content: "Response from Background action: "+request.action,timerId: timerId})
      }
    if (request.action == "Stop Timer"){
        clearInterval(request.timerId);
        chrome.tabs.sendMessage(parseInt(request.tabId),{action:"UpdateDiv",ccMessage:''}, function(res) { });
        sendResponse({ content: "Response from Background action: "+request.action})
    }
    sendResponse({ content: "Response from Background action: "+request.action})
    });
