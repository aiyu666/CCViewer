function updateCCView(id,data){
  $("#"+id).html(data);
}

function show(){
  var dataFL=null;
  var dataSL=null;
  var divccView=document.createElement("div");
  document.body.appendChild(divccView);
  var divFL=document.createElement("div");
  var divSL=document.createElement("div");
  divccView.appendChild(divFL);
  divccView.appendChild(divSL);
  divFL.align="right";
  divSL.align="right";
  divccView.id="ccView";
  divFL.id="ccViewFL";
  divSL.id="ccViewSL";
  divccView.className="mouseMove";
  divFL.style="font-size:20px;background-color:#000000;z-index:3000;position:fixed;top:0;right:0; padding:2px;";
  divSL.style="font-size:20px;background-color:#000000;z-index:3000;position:fixed;top:25px;right:0;padding:2px;";
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

// var tarObj = null;

// function mouseMove(ev){//設定當滑鼠移動時的做為
//   ev = ev || window.event;
//   var mousePos = mouseCoords(ev);

//   if (tarObj){//當有物件時設定物件的屬性(會不會動是看這裡)
//     console.log("if tarObj=ture");
//     tarObj.style.position = 'fixed';
//     tarObj.style.top = mousePos.y;
//     tarObj.style.left = mousePos.x;
//   }
// }
// function mouseCoords(ev){//取得x,y的值
//   if (ev.pageX || ev.pageY){
//     return {x:ev.pageX,y:ev.pageY};
//   }
//   return {
//     x: ev.clienX + document.body.scrollLeft - document.body.clientLeft,
//     y: ev.clienY + document.body.scrollTop - document.body.clientTop
//     };
// }

// function mouseDown(ev){//當按下滑鼠時所要做的事
//   console.log(ev);
//   console.log("Mouse down");
//   ev = ev || window.event;
//   var target = ev.target || ev.srcElement;
//   tarObj = target;//將所按下的物件傳給物件變數
// }

// function mouseUp(){//處理放開滑鼠按鍵時把物件變數設為null
//   tarObj = null;
// }

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
