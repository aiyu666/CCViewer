function backgroundWoker(listenTabId,tabId){
    chrome.tabs.sendMessage(parseInt(listenTabId),{action:"getLyrics"}, function(response) {
        var ccMessageFL=response.ccMessage.dataFL;
        var ccMessageSL=response.ccMessage.dataSL;
        console.log(ccMessageFL+"<<<<<FL");
        console.log(ccMessageSL+"<<<<<SL");
        if (ccMessageFL==undefined){
            ccMessageFL=null
        }
        if (ccMessageSL==undefined){
            ccMessageSL=null
        }
        if (ccMessageFL!=localStorage.getItem("ccMessageFL")){
            localStorage['ccMessageFL']=ccMessageFL;
            chrome.tabs.sendMessage(parseInt(tabId),{action:"UpdateDiv",id:"ccViewFL",ccMessage:ccMessageFL}, function(res) {
          });
        }
        if (ccMessageSL!=localStorage.getItem("ccMessageSL")){
            localStorage['ccMessageSL']=ccMessageSL;
            chrome.tabs.sendMessage(parseInt(tabId),{action:"UpdateDiv",id:"ccViewSL",ccMessage:ccMessageSL}, function(res) {
          });
        }
      });

}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Background woker get something");
    console.log(request);
    if (request.action=="Start Timer"){
        console.log("Start timer");
        console.log("I got tabId is "+request.tabId);
        localStorage['ccMessageFL']=null;
        localStorage['ccMessageSL']=null
        var timerId = setInterval(function(){ backgroundWoker(request.listenTabId,request.tabId) }, 500);
        sendResponse({ content: "Response from Background action: "+request.action,timerId: timerId})
      }
    if (request.action == "Stop Timer"){
        console.log("Stop Timer");
        clearInterval(request.timerId);
        chrome.tabs.sendMessage(parseInt(request.tabId),{action:"UpdateDiv",ccMessage:''}, function(res) { });
        sendResponse({ content: "Response from Background action: "+request.action})
    }
    sendResponse({ content: "Response from Background action: "+request.action})
    });
