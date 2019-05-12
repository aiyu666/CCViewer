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
    StartListenCC();
  });
  console.log("show finish");

}
function StartListenCC(){
  console.log("StartListenCC send gogogo");
  var listenTabId = parseInt(localStorage.getItem("listenTabId"));
  var tabId = parseInt(localStorage.getItem("tabId"));
  chrome.runtime.sendMessage({"action":"Start Timer","listenTabId":listenTabId,"tabId":tabId},
    function(response) {
      console.log(response.content);
      console.log(response.timerId+"<<<<TimerId I get!!");
      localStorage[tabId.toString()]=response.timerId;
    });
}

function disablelistenCC(){
  console.log("disable");
  chrome.tabs.query({
    active: true,
    currentWindow: true
    }, function(tabs) {
      var tabId = tabs.id;
      console.log("Timer Id below");
      console.log("cacel's tabId is "+tabId);
      if (localStorage.getItem(tabId.toString())!=null){
        console.log("tabId's local storage != null");
        chrome.runtime.sendMessage({"action":"Stop Timer","timerId":localStorage.getItem(tabId.toString())},
        function(response) {
          console.log(response.content);
        });
      }
      else{
        alert("you don't have Listen CC");
      }

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
var test=12345;
var testt=1;
localStorage[test.toString()]=testt;
console.log("Test Start")
console.log(localStorage.getItem(test.toString()));
console.log("Test Done")
