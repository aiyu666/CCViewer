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
  $("#appear").prop("disabled", true);
  $("#disappear").prop("disabled", false);
  chrome.runtime.sendMessage(
    { action: "Start Timer", "listenTabId":listenTabId},
    function(response) {
      chrome.storage.local.set({"timerId": response.timerId});
      alert("監聽成功，你可以去其他頁面做事囉～但是注意不要把我縮下去唷，可以開子母畫面。Enjoy it !");
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
      alert("取消監聽成功！歡迎在使用我唷<3");
    }
  );
}

document.addEventListener("DOMContentLoaded", function(dcle) {
  $("#listen").on("click", listenCC);
  $("#appear").on("click", showCC);
  $("#disappear").on("click", disablelistenCC);
});
