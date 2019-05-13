function updateCCView(data){
  $("#ccViewFL").html(data);
}

function show(){
  var dataFL="";
  var divFL=document.createElement("div");
  document.body.appendChild(divFL);
  divFL.align="right";
  divFL.id="ccViewFL";
  divFL.style="font-size:20px;background-color:#000000;z-index:3000;position:fixed;top:0;right:0";
  divFL.innerText =dataFL;
  divFL.style.color= "#FFFFFF";
  var dataSL="";
  var divSL=document.createElement("div");
  document.body.appendChild(divSL);
  divSL.align="right";
  divSL.id="ccViewSL";
  divSL.style="font-size:20px;background-color:#000000;z-index:3000;position:fixed;top:25px;right:0";
  divSL.innerText =dataSL;
  divSL.style.color= "#FFFFFF";
  }

function getLyrics(){
  var dataFL=$(".ytp-caption-segment").eq(0).html();
  if ($(".ytp-caption-segment").length >1){
    var dataSL=$(".ytp-caption-segment").eq(1).html();
  }else{

  }
  console.log("I get cc lyrics first line>>"+dataFL);
  console.log("I get cc lyrics second line>>"+dataSL);
  return dataFL,dataSL;
  }

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
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
    dataFL ,dataSL= getLyrics();
    sendResponse({ content: "content script finish(getLyrics)" ,ccMessage:{dataFL:dataFL,dataSL:dataSL}});
  }

});

show();