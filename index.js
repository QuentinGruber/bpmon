const MusicTempo = require("music-tempo");
const writeJson = require("write-json");
const AudioContext = require("web-audio-api").AudioContext;
const fs = require("fs");

exports.convert = function (PathToFile) {
  calcTempo = function (buffer) {
    var audioData = [];
    // Take the average of the two channels
    if (buffer.numberOfChannels == 2) {
      var channel1Data = buffer.getChannelData(0);
      var channel2Data = buffer.getChannelData(1);
      var length = channel1Data.length;
      for (var i = 0; i < length; i++) {
        audioData[i] = (channel1Data[i] + channel2Data[i]) / 2;
      }
    } else {
      audioData = buffer.getChannelData(0);
    }
    var mt = new MusicTempo(audioData);

    writeJson.sync(FileName + ".json", {
      tempo: mt.tempo,
      beats: mt.beats,
    });
  };

  if (PathToFile != undefined) {
    var data = fs.readFileSync(PathToFile);
    var FileName = PathToFile.split(".")[0];
    var context = new AudioContext();
    context.decodeAudioData(data, calcTempo);
  } else {
    console.log("missing arg PathToFile");
  }
};
