function show(){
  var data=document.getElementsByClassName("ytp-caption-segment").item(0);
  var div=document.createElement("div"); 
  document.body.appendChild(div); 
  div.align="right";
  div.id="ccView";
  div.style="font-size:20px;background-color:#FFFFFF;z-index:3000;position:fixed;top:0;right:0";
  console.log(data);
  div.innerText=data.innerHTML;  
  }
function addCCView(ccText){
    div.innerHTML=ccText;
}

console.log("Test content script can get tabid")
console.log(localStorage.getItem("tabId"));
