function showCC() {
  if (localStorage.getItem("listenTabId") != null) {
    if (localStorage.getItem("status") != 1) {
      localStorage["status"] = 1;
      $("#disappear").prop("disabled", false);
      $("#appear").prop("disabled", true);
      StartListenCC();
    }
  } else {
    alert("Please listen a youtube page first. Thanks");
  }
}

function listenCC() {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    function(tabs) {
      var listentabURL = tabs[0].url;
      var listenTabId = tabs[0].id;
      if (listentabURL.match("https://www.youtube.com/*") != null) {
        var storage = chrome.storage.local;
        SetListenId(listenTabId);
        StartListenCC();
      } else {
        alert(
          "This is not youtube page you can't use this chrome extension to liseten cc lyrics in other website!"
        );
        $("#Status").text("Listen Fail");
      }
    }
  );
}

function SetListenId(listenTabId){
  chrome.runtime.sendMessage(
    { action: "Set listenTabId", listenTabId: listenTabId},
    function(response) {
      console.log(response.content)
    }
  );
}

function StartListenCC() {
  chrome.runtime.sendMessage(
    { action: "Start Timer"},
    function(response) {
      alert("Success! You can start to other page. Enjoy it !");
    }
  );
}

function disablelistenCC() {
  $("#appear").prop("disabled", false);
  $("#disappear").prop("disabled", true);
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    function(tabs) {
      var tabId = tabs[0].id;
      chrome.runtime.sendMessage(
        {
          action: "Stop Timer",
          tabId: tabId,
          timerId: localStorage.getItem(tabId.toString())
        },
        function(response) {
          localStorage[tabId.toString()] = null;
          chrome.tabs.sendMessage(
            parseInt(tabId),
            { action: "UpdateDiv", id: "ccViewFL", ccMessage: null },
            function(res) {}
          );
          chrome.tabs.sendMessage(
            parseInt(tabId),
            { action: "UpdateDiv", id: "ccViewSL", ccMessage: null },
            function(res) {}
          );
        }
      );
    }
  );
}

document.addEventListener("DOMContentLoaded", function(dcle) {
  $("#listen").on("click", listenCC);
  $("#appear").on("click", showCC);
  $("#disappear").on("click", disablelistenCC);
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    function(tabs) {
      var tabId = tabs[0].id;
      if (localStorage.getItem(tabId.toString()) != null) {
        console.log("havelocalstorage");
        console.log(tabId);
        $("#appear").prop("disabled", true);
        $("#disappear").prop("disabled", false);
      } else {
        console.log("don'thavelocalstorage");
        console.log(tabId);
        $("#appear").prop("disabled", false);
        $("#disappear").prop("disabled", true);
      }
    }
  );
});
