function backgroundWoker(listenTabId,tabId){
    // console.log("Call background worker sucess");
    chrome.tabs.sendMessage(parseInt(listenTabId),{action:"getLyrics"}, function(response) {  
        // console.log("callback from the content script call back(getLyrics)");
        // console.log(response);
        var ccMessage=response.ccMessage;
        // console.log(ccMessage);
        // console.log("above is ccccc");
        if (ccMessage!=localStorage.getItem("listenTabId")){
          chrome.tabs.sendMessage(parseInt(tabId),{action:"UpdateDiv",ccMessage:ccMessage}, function(res) {  
            // console.log("callback from the content script call back(UpdateDiv)");
            // console.log(res);
          });
        }
        
      });

}

function cancelBackgroundWorker(timerId){
  clearInterval(timerId);
  console.log("Stop Success");
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Background woker get something");
    console.log(request);
    if (request.action=="Start Timer"){
        console.log("Start timer");
        console.log("I got tabId is "+request.tabId);
        localStorage['ccMessage']=''
        var timerId = setInterval(function(){ backgroundWoker(request.listenTabId,request.tabId) }, 500);
        sendResponse({ content: "Response from Background action: "+request.action,timerId: timerId})
      }
    if (request.action == "Stop Timer"){
        console.log("Stop Timer");
        cancelBackgroundWorker(1);
        sendResponse({ content: "Response from Background action: "+request.action})
    }
    sendResponse({ content: "Response from Background action: "+request.action})
    });
