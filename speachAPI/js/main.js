/* eslint-disable */

// init speech synth api
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");

//Browser identifier
// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== "undefined";

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

// init voices array
let voices = [];
const getVoices = () => {
  voices = synth.getVoices();
  console.log(voices);
  //loop through voices & create an option for each one
  voices.forEach(voice => {
    //create option element
    const option = document.createElement("option");

    //fill the option with voice & lang
    option.textContent = voice.name + "(" + voice.lang + ")";

    //set needed option attributes
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// Speak
const Speak = () => {
  //check if speaking
  if (synth.speaking) {
    console.error("Already speaking..");
    return;
  }
  if (textInput.value !== "") {
    //get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    //speak end
    speakText.onend = e => {
      console.log("done speaking..");
    };
    //speak error
    speakText.onerror = e => {
      console.log("sonething went wrong..");
    };

    //selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );
    //loop through voices
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });
    console.log(voiceSelect.selectedOptions[0]);
    //set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    //Speak
    synth.speak(speakText);
  }
};

// event listeners

// text form submit
textForm.addEventListener("submit", e => {
  e.preventDefault();
  Speak();
  textInput.blur();
});

//rate value change
rate.addEventListener("change", e => (rateValue.textContent = rate.value));

//pitch value change
pitch.addEventListener("change", e => (pitchValue.textContent = pitch.value));

// voice select change
voiceSelect.addEventListener("change", e => Speak());
