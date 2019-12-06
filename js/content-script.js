function setLyricsLine(lyricsLine,lyricsTop){
  chrome.storage.local.set({"lyricsLine":lyricsLine,"lyricsTop":lyricsTop})
}

function updateCCView(id, data) {
  $("#ccView" + id).html(data);
}

function show(index, lyricsTop) {
  var ccView = document.createElement("div");
  this.divccView.appendChild(ccView);
  divccView.appendChild(ccView);
  ccView.id = "ccView" + index.toString();
  ccView.style =
    "font-size:20px;background-color:#000000;z-index:3000;position:fixed;top:" +
    lyricsTop+
    "px;right:0; padding:2px;";
  ccView.style.color = "#FFFFFF";
}

function getLyrics() {
  var lyrics = [];
  var lyricsObject = $(".ytp-caption-segment");
  console.log(lyricsObject);
  var length = $(".ytp-caption-segment").length;
  for (i=0 ; i<length; i++){
    lyrics.push($(".ytp-caption-segment")[i].innerText);
  }
  console.log("GETTTTT");
  console.log(lyrics);

  return lyrics;
}

chrome.runtime.onMessage.addListener(function(message, sendResponse) {
  if (message.action == "Init lyricsLine") {
    chrome.storage.local.set({"lyricsLine":2,"top":20});
  }
  if (message.action == "UpdateDiv") {
    var lyricsLengh = message.length;
    var lyricsLine = result.lyricsLine; 
    var lyricsTop = result.top;
    var diffLine = lyricsLengh - lyricsLine;
    chrome.storage.local.get(["lyricsLine","top"],function(result){
      if ( diffLine > 1 ){
        for (i = 0 ; i < diffLine; i++){
          lyricsTop += 20;
          lyricsLine += 1;
          show(lyricsLine, lyricsTop);
        }
        chrome.storage.local.set({"lyricsLine":lyricsLine,"lyricsTop":lyricsTop});
      };
      
    })
    for (i= 0 ; i < lyricsLengh; i++){
      updateCCView(i, message.lyrics[i]);  
    }
    
    sendResponse({ content: "content script finish(UpdateDiv)" });
  }
  if (message.action == "getLyrics") {
    console.log("I get a action about get lyrics");
    lyrics = getLyrics();
    sendResponse({
      content: "content script finish(getLyrics)",
      lyrics: lyrics
    });
  }
});

var divccView = document.createElement("div");
document.body.appendChild(divccView);
divccView.id = "ccView";
divccView.align = "right";
chrome.storage.local.get(["lyricsLine"],function(result){
  var lyricsLine = result.lyricsLine;
  var lyricsTop = 0;
  for (i = 0; i > lyricsLine; i++){
    show(i, lyricsTop);
    lyricsTop += 20;
  }
});
