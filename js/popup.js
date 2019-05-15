function listenCC(){
  chrome.tabs.query({
    active: true,
    currentWindow: true
    }, function(tabs) {
    var listentabURL = tabs[0].url;
    var listenTabId = tabs[0].id;
    if (listentabURL.match("https://www.youtube.com/*") != null){
      console.log("start listen")
      localStorage['listenTabId']=listenTabId;
      localStorage['listentabURL']=listentabURL;
      localStorage['created']=1;
      console.log("listenTabId below")
      console.log(localStorage.getItem("listenTabId"));
      console.log("listen finish")
      alert("Listen Success");
    }else{
      alert("This is not youtube page you can't use this chrome extension to liseten cc lyrics in other website!")
    }
    });
}

function showCC(){
  $("#disappear").prop('disabled', false);
  $("#appear").prop('disabled', true);
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
      console.log(localStorage.getItem(tabId.toString())+"<<<TimerId From localStorage");
    });
}

function disablelistenCC(){
  chrome.tabs.query({
  active: true,
  currentWindow: true
  }, function(tabs) {
    var tabId = tabs[0].id;
    chrome.runtime.sendMessage({"action":"Stop Timer","tabId":tabId,"timerId":localStorage.getItem(tabId.toString())},
    function(response) {
      console.log(response.content)
      localStorage[tabId.toString()]=null;
      $("#appear").prop('disabled', false);
      $("#disappear").prop('disabled', true);
    });
    console.log("Clear!");
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
        $("#appear").prop('disabled', true);
        $("#disappear").prop('disabled', false);
    }else{
      $("#disappear").prop('disabled', true);
      $("#appear").prop('disabled', false);
    }
  });
});
