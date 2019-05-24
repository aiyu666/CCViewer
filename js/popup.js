function listenCC(){
  chrome.tabs.query({
    active: true,
    currentWindow: true
    }, function(tabs) {
    var listentabURL = tabs[0].url;
    var listenTabId = tabs[0].id;
    if (listentabURL.match("https://www.youtube.com/*") != null){
      localStorage['listenTabId']=listenTabId;
      localStorage['listentabURL']=listentabURL;
      localStorage['created']=1;
      alert("Listen Success");
    }else{
      alert("This is not youtube page you can't use this chrome extension to liseten cc lyrics in other website!")
    }
    });
}

function showCC(){
  $("#disappear").prop('disabled', false);
  $("#appear").prop('disabled', true);
  chrome.tabs.query({
  active: true,
  currentWindow: true
  }, function(tabs) {
    var tabId = tabs[0].id;
    localStorage['tabId']=tabId;
    StartListenCC();
  });
}

function StartListenCC(){
  var listenTabId = parseInt(localStorage.getItem("listenTabId"));
  var tabId = parseInt(localStorage.getItem("tabId"));
  console.log("I will send a request to background");
  chrome.runtime.sendMessage({"action":"Start Timer","listenTabId":listenTabId,"tabId":tabId},
    function(response) {
      console.log("I got Start timer from background work");
      localStorage[tabId.toString()]=response.timerId;
      localStorage.getItem(tabId.toString())
    });
}

function disablelistenCC(){
  $("#appear").prop('disabled', false);
  $("#disappear").prop('disabled', true);
  chrome.tabs.query({
  active: true,
  currentWindow: true
  }, function(tabs) {
    var tabId = tabs[0].id;
    chrome.runtime.sendMessage({"action":"Stop Timer","tabId":tabId,"timerId":localStorage.getItem(tabId.toString())},
    function(response) {
      localStorage[tabId.toString()]=null;
      chrome.tabs.sendMessage(parseInt(tabId),{action:"UpdateDiv",id:"ccViewFL",ccMessage:null}, function(res) {
          });
      chrome.tabs.sendMessage(parseInt(tabId),{action:"UpdateDiv",id:"ccViewSL",ccMessage:null}, function(res) {
          });
    });
  });
}


document.addEventListener('DOMContentLoaded', function(dcle) {
  $("#listen").on('click', listenCC);
  $("#appear").on('click', showCC);
  $("#disappear").on('click', disablelistenCC);
  chrome.tabs.query({
  active: true,
  currentWindow: true
  }, function(tabs) {
    var tabId = tabs[0].id;
    if (localStorage.getItem(tabId.toString())!=null){
      console.log("havelocalstorage");
      $("#appear").prop('disabled', true);
      $("#disappear").prop('disabled', false);
    }else{
      console.log("don'thavelocalstorage");
      $("#appear").prop("disabled",false);
      $("#disappear").prop('disabled', true);
    }
  });
});
