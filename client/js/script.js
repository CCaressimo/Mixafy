const { response } = require("express")

function setHalfVolume() {
  var myAudio = document.getElementById("playlist_generator");
  myAudio.volume = 0.5; //Changed this to 0.5 or 50% volume since the    function is called Set Half Volume ;)
}

