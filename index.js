const Args = process.argv.slice(2);

const AudioContext = require("web-audio-api").AudioContext;
const fs = require("fs");
const { calcTempo } = require("./utils");

if (Args < 1) {
  console.log("missing args");
  process.exit(0);
}

var data = fs.readFileSync(Args[0]);

var context = new AudioContext();
context.decodeAudioData(data, calcTempo);
