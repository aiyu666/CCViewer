chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log("I'm in background");
    console.log(message);
    console.log(sender);
    if (message.action == "ListenCC"){
      console.log("I got the message action is ListenCC");
      sendResponse({ content: "content script finish(ListenCC)" });
    }

  });
  