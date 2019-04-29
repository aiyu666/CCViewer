function listenCC(){
  console.log("start listen")
  
  chrome.tabs.executeScript({
    file: "js/content-script.js"
  });
  console.log("done")
}

function showCC(){
  console.log("start show")
  
  chrome.tabs.executeScript({
    file: "js/content-script.js"
  });
  console.log("done")
}

function disablelistenCC(){
  console.log("disable")
}

var getSelectedTab = (tab) => {
  var tabId = tab.id;
  console.log(tabId);
  var sendMessage = (messageObj) => chrome.tabs.sendMessage(tabId, messageObj);
  document.getElementById('listen').addEventListener('click', listenCC);
  document.getElementById('appear').addEventListener('click', showCC);
  document.getElementById('disappear').addEventListener('click', disablelistenCC)
}

var tabyo=chrome.tabs.getSelected(null, getSelectedTab);
// 2020519357 2020519387 2020519406 