function listenCC(){
  chrome.tabs.query({
    index: 0
    }, function(tabs) {
    var listentabURL = tabs[0].url;
    var listenTabId = tabs[0].id;
    console.log("start listen")
    localStorage['listenTabId']=listenTabId;
    localStorage['listentabURL']=listentabURL;
    console.log("listenTabId below")
    console.log(localStorage.getItem("listenTabId"));
    console.log("listen finish")

    });
  
}

function showCC(){
  console.log("start show");
  console.log("tabid below");
  chrome.tabs.query({
  active: true,
  currentWindow: true
  }, function(tabs) {
    var tabId = tabs[0].id;
    localStorage['tabId']=tabId;
    chrome.tabs.sendMessage(tabId, {action:"createDiv"}, function(response) {  
      console.log("The content script call back(createDiv) ");
      console.log(response);
      sendListenCC();
      console.log("sendListenis gogogogo");

    });
  });
  
  console.log("show finish");

}
function sendListenCC(){
  console.log("send ListenCC send gogogo");
  var listenTabId = localStorage.getItem("listenTabId");
  var tabId = localStorage.getItem("tabId");
  console.log(typeof listenTabId);
  console.log(parseInt(listenTabId));
  chrome.tabs.sendMessage(parseInt(listenTabId),{action:"Listen",tabId:localStorage.getItem("tabId")}, function(response) {  
    console.log("The content script call back(ListenCC)");
    console.log(response);
    console.log("above is ccccc");
    chrome.tabs.sendMessage(parseInt(tabId),{action:"UpdateDiv",ccMessage:response.ccMessage}, function(response2) {  
      console.log("The content script call back(ListenCC22222222222)");
      console.log(response2);
    });
  
  });
  
}


function disablelistenCC(){
  console.log("disable");
  chrome.tabs.query({
    active: true,
    currentWindow: true
    }, function(tabs) {
    console.log("list tab");
    console.log("now tab below");
    console.log(tabs[0].id);
    console.log("listen tab below");
    console.log(localStorage.getItem("listenTabId"));;
    console.log("list finish")

    });
}


document.addEventListener('DOMContentLoaded', function(dcle) {  
  var listenButtonEvent = document.getElementById('listen') 
  var showButtonContent = document.getElementById("appear");  
  var disshowButtonContent = document.getElementById("disappear");
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    var tabURL = tabs[0].url;
    var tabId = tabs[0].id;
    console.log(tabs);
    console.log(tabURL);
    listenButtonEvent.addEventListener('click', listenCC);
    showButtonContent.addEventListener('click', showCC);
    disshowButtonContent.addEventListener('click', disablelistenCC);
  });
 
});
