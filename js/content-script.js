function getCC(){
  console.log("getCingC");
  var data=document.getElementsByClassName("ytp-caption-segment");
  console.log(data.item(0).innerHTML);
  // data.addEventListener('change',updateCC);
  // updateCC();
  console.log("getCC end QQ");
  return data.item(0).innerHTML
}

function show(){
  var data="";
  var div=document.createElement("div"); 
  document.body.appendChild(div); 
  div.align="right";
  div.id="ccView";
  div.style="font-size:20px;background-color:#FFFFFF;z-index:3000;position:fixed;top:0;right:0";
  div.innerText=data;

  }

function updateCC(data){
  var ccView = document.getElementById("ccView");  
  ccView.innerHTML=data;
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log(message);
  console.log(sender);
  if (message.action == "createDiv"){
    show();
    sendResponse({ content: "content script finish(createDiv)" });
  }
  if (message.action == "UpdateDiv"){
    updateCC(message.ccMessage);
    sendResponse({ content: "content script finish(UpdateDiv)" });
  }
  if (message.action == "Listen"){
    data = getCC();
    sendResponse({ content: "content script finish(ListenDiv)" ,ccMessage:data});
  }

});

