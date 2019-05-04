function listenCC(){
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    var tabURL = tabs[0].url;
    var tabId = tabs[0].id;
    console.log("start listen")
    localStorage['tabId']=tabId;
    localStorage['tabURL']=tabURL;
    console.log("tabid below")
    console.log(localStorage.getItem("tabId"));
    console.log("listen finish")
    });
  
}
function doStuffWithDom(domContent) {
  console.log('I received the following DOM content:\n' + domContent);
}

function showCC(){
  console.log("start show")
  console.log("tabid below")
  console.log(localStorage.getItem("tabId"));

console.log("done")
}

function disablelistenCC(){
  console.log("disable")
}
chrome.tabs.query({
  active: true,
  currentWindow: true
}, function(tabs) {
  var tabURL = tabs[0].url;
  var tabId = tabs[0].id;
  console.log(tabs);
  console.log(tabURL);
  document.getElementById('listen').addEventListener('click', listenCC);
  document.getElementById('appear').addEventListener('click', showCC);
  document.getElementById('disappear').addEventListener('click', disablelistenCC);
});
