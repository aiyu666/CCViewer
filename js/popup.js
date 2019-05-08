function listenCC(){
  chrome.tabs.query({
    active: true,
    currentWindow: true
    }, function(tabs) {
    var listentabURL = tabs[0].url;
    var listenTabId = tabs[0].id;
    console.log("start listen")
    localStorage['listenTabId']=listenTabId;
    localStorage['listentabURL']=listentabURL;
    localStorage['created']=1;
    console.log("listenTabId below")
    console.log(localStorage.getItem("listenTabId"));
    console.log("listen finish")

    });
  
}

function showCC(){
  console.log("start show");
  chrome.tabs.query({
  active: true,
  currentWindow: true
  }, function(tabs) {
    var tabId = tabs[0].id;
    localStorage['tabId']=tabId;
    chrome.tabs.sendMessage(tabId, {action:"createDiv"}, function(response) { 
      console.log("The content script call back(createDiv) ");
      console.log(response);
      StartListenCC();
    });
  });
  console.log("show finish");

}
function StartListenCC(){
  console.log("StartListenCC send gogogo");
  var listenTabId = parseInt(localStorage.getItem("listenTabId"));
  var tabId = parseInt(localStorage.getItem("tabId"));
  console.log(listenTabId);
  console.log(tabId);
  chrome.runtime.sendMessage({"action":"Start Timer","listenTabId":listenTabId,"tabId":tabId},
    function(response) {
      console.log("back frome background worker");
      console.log(response.content);
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
