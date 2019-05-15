function updateCCView(id,data){
  $("#"+id).html(data);
}

function show(){
  var dataFL=null;
  var dataSL=null;
  var divFL=document.createElement("div");
  var divSL=document.createElement("div");
  document.body.appendChild(divFL);
  document.body.appendChild(divSL);
  divFL.align="right";
  divSL.align="right";
  divFL.id="ccViewFL";
  divSL.id="ccViewSL";
  divFL.style="font-size:20px;background-color:#000000;z-index:3000;position:fixed;top:0;right:0; padding:0;";
  divSL.style="font-size:20px;background-color:#000000;z-index:3000;position:fixed;top:25px;right:0;padding: 0;";
  divFL.innerText =dataFL;
  divSL.innerText =dataSL;
  divFL.style.color= "#FFFFFF";
  divSL.style.color= "#FFFFFF";
  }

function getLyrics(){
  dataFL=$(".ytp-caption-segment").eq(0).html();
  dataSL=$(".ytp-caption-segment").eq(1).html();
  return [dataFL,dataSL];
  }

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action == "createDiv"){
    show();
    sendResponse({ content: "content script finish(createDiv)" });
  }
  if (message.action == "UpdateDiv"){
    updateCCView(message.id,message.ccMessage);
    sendResponse({ content: "content script finish(UpdateDiv)" });
  }
  if (message.action == "getLyrics"){
    data= getLyrics();
    sendResponse({ content: "content script finish(getLyrics)" ,ccMessage:{dataFL:data[0],dataSL:data[1]}});
  }

});

show();