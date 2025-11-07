const pads = document.querySelectorAll('.drum-pad');
const display = document.getElementById('display');
const volumeControl = document.getElementById('volume');
const powerSwitch = document.getElementById('power-switch');
const bankSwitch = document.getElementById('bank-switch');

let powerOn = true;
let bankOn = false;

const bankOne = {
  Q: ["Heater-1", "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"],
  W: ["Heater-2", "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"],
  E: ["Heater-3", "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"],
  A: ["Heater-4", "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"],
  S: ["Clap", "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"],
  D: ["Open-HH", "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"],
  Z: ["Kick-n'-Hat", "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"],
  X: ["Kick", "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"],
  C: ["Closed-HH", "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"]
};

const bankTwo = {
  Q: ["Chord-1", "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"],
  W: ["Chord-2", "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"],
  E: ["Chord-3", "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"],
  A: ["Shaker", "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"],
  S: ["Open-HH", "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"],
  D: ["Closed-HH", "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"],
  Z: ["Punchy-Kick", "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"],
  X: ["Side-Stick", "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"],
  C: ["Snare", "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"]
};

function updatePads() {
  const currentBank = bankOn ? bankTwo : bankOne;
  pads.forEach(pad => {
    const key = pad.textContent.trim();
    pad.querySelector('audio').src = currentBank[key][1];
    pad.id = currentBank[key][0];
  });
  display.textContent = bankOn ? "Smooth Piano Kit" : "Heater Kit";
}

pads.forEach(pad => {
  pad.addEventListener('click', () => playSound(pad));
});

document.addEventListener('keydown', e => {
  const key = e.key.toUpperCase();
  const pad = Array.from(pads).find(p => p.textContent.trim() === key);
  if (pad) playSound(pad);
});

function playSound(pad) {
  if (!powerOn) return;
  const audio = pad.querySelector('audio');
  audio.currentTime = 0;
  audio.volume = volumeControl.value;
  audio.play();
  display.textContent = pad.id;
  pad.style.background = '#007bff';
  setTimeout(() => (pad.style.background = '#6e6e6e'), 150);
}

powerSwitch.addEventListener('click', () => {
  powerOn = !powerOn;
  powerSwitch.classList.toggle('active');
  display.textContent = powerOn ? "Power On" : "";
});

bankSwitch.addEventListener('click', () => {
  if (!powerOn) return;
  bankOn = !bankOn;
  bankSwitch.classList.toggle('active');
  updatePads();
});

updatePads();
