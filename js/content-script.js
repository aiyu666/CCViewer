function updateCCView(data){
  var ccView = document.getElementById("ccView");  
  ccView.innerHTML=data;
}

function show(){
  var data="init";
  var div=document.createElement("div");
  document.body.appendChild(div); 
  div.align="right";
  div.id="ccView";
  div.style="font-size:20px;background-color:#000000;z-index:3000;position:fixed;top:0;right:0";
  div.innerText =data;
  div.style.color= "#FFFFFF";
  }

function getLyrics(){
  var data=document.getElementsByClassName("ytp-caption-segment").item(0).innerHTML;
  return data;
  }
  

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log(message);
  console.log(sender);
  if (message.action == "createDiv"){
    show();
    sendResponse({ content: "content script finish(createDiv)" });
  }
  if (message.action == "UpdateDiv"){
    console.log("I got a update with "+message.ccMessage);
    updateCCView(message.ccMessage);
    sendResponse({ content: "content script finish(UpdateDiv)" });
  }
  if (message.action == "getLyrics"){
    data = getLyrics();
    sendResponse({ content: "content script finish(getLyrics)" ,ccMessage:data});
  }

});
