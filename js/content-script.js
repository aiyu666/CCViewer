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
  var length = $(".ytp-caption-segment").length;
  for (i=0 ; i<length; i++){
    lyrics.push($(".ytp-caption-segment")[i].innerText);
  }
  return lyrics
}
//---------------------------------------
// RUN TIME ONCE MESSAGE RECIVE
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action == "Init lyricsLine") {
    chrome.storage.local.set({"lyricsLine":2,"lyricsTop":30});
  };

  if (message.action == "UpdateDiv") {
    var lyricsLengh = message.length;
    chrome.storage.local.get(["lyricsLine","lyricsTop"],function(result){
    var lyricsLine = result.lyricsLine; 
    var lyricsTop = result.lyricsTop;
    var diffLine = lyricsLengh - lyricsLine;
    if ( diffLine > 1 ){
      for (i = 0 ; i < diffLine; i++){
        lyricsTop += 30;
        lyricsLine += 1;
        show(lyricsLine, lyricsTop);
        }
        chrome.storage.local.set({"lyricsLine":lyricsLine,"lyricsTop":lyricsTop});
      };
    for (i= 0 ; i < lyricsLine; i++){
      if (message.lyrics[i]==undefined){
        updateCCView(i, ""); 
      }else{
        updateCCView(i, message.lyrics[i]); 
      }
       
    };
    })

    sendResponse("Update Complete")
  };

  if (message.action == "getLyrics") {
    var lyrics = getLyrics();
    sendResponse(lyrics)
  };
});

// Create ccviewLine when page load
var divccView = document.createElement("div");
document.body.appendChild(divccView);
divccView.id = "ccView";
divccView.align = "right";
chrome.storage.local.get(["lyricsLine"],function(result){
  var lyricsLine = result.lyricsLine;
  var lyricsTop = 0;
  for (i = 0; i < lyricsLine; i++){
    show(i, lyricsTop);
    lyricsTop += 30;
  }
});
