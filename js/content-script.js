function listenTime(){
    console.log("start listen time");
    console.log("done");
  }
function addCCView(ccText){
    div.innerHTML=ccText;
}

var data=document.getElementsByClassName("ytp-caption-segment").item(0);
var div=document.createElement("div"); 
document.body.appendChild(div); 
div.align="right";
div.id="ccView";
div.style="font-size:20px;background-color:#FFFFFF;z-index:3000;position:fixed;top:0;right:0";
console.log(data);
div.innerText=data.innerHTML;
