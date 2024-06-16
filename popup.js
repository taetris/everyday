const timerDisplay = document.getElementById('timer');
const start = document.getElementById('start');

const reset = document.getElementById('reset');
const banner = document.getElementById('banner');

let alarmSound = new Audio('alarm.wav');
let isPlayingSound = false;

const playSound = () => {
    return new Promise((resolve) => {
        alarmSound.play();
        alarmSound.onended = () => {
            resolve();
        };
    });
};
start.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "start" });
    console.log("start bro")
  });

 
reset.addEventListener('click', () => {
    
    chrome.runtime.sendMessage({ action: "reset" });
});




chrome.runtime.onMessage.addListener((message) => {
    banner.innerHTML = message.timerState.message;

    if (message.action === "update") {
        const { minutes, seconds } = message.timerState;
        timerDisplay.innerHTML = minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 }) + ":" + seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 });
    } else if (message.action === "timeUp") {
        alarmSound.play();
    }else if(message.action === "debug"){
        console.log("debug: ", message.timerState.running)
    }
});

// malfunctioning when multiple open tabs, maybe multiple instances running parallely
