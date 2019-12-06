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
        StartListenCC(listenTabId);
      } else {
        alert(
          "This is not youtube page you can't use this chrome extension to liseten cc lyrics in other website!"
        );
        $("#Status").text("Listen Fail");
      }
    }
  );
}

function StartListenCC(listenTabId) {
  chrome.runtime.sendMessage(
    { action: "Start Timer", "listenTabId":listenTabId},
    function(response) {
      alert("Success! You can start to other page. Enjoy it !");
    }
  );
}

function disablelistenCC() {
  $("#appear").prop("disabled", false);
  $("#disappear").prop("disabled", true);
  chrome.runtime.sendMessage(
    {
      action: "Stop Timer",
    },
    function(response) {
      console.log(response.content)
    }
  );
}

document.addEventListener("DOMContentLoaded", function(dcle) {
  $("#listen").on("click", listenCC);
  $("#appear").on("click", showCC);
  $("#disappear").on("click", disablelistenCC);
});
