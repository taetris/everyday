const timer = document.getElementById('timer');
const start = document.getElementById('start');
const pause = document.getElementById('pause');
const reset = document.getElementById('reset');``
const banner = document.getElementById('banner');

start.addEventListener('click', () => {
    
    if(timerState.isBreak === true){
        banner.innerHTML = "Break time";
        timer.innerHTML = "05:00";
    }
    else{
        banner.innerHTML = "Work time";
        timer.innerHTML = "25:00";
    } 
    chrome.runtime.sendMessage({ action: "start" });
  });



chrome.runtime.onMessage.addListener((message) => {
if (message.action === "update") {
    console.log("updating...")
    
    timer.innerHTML = message.timerState.minutes.toLocaleString(undefined,{minimumIntegerDigits: 2}) + ":" + message.timerState.seconds.toLocaleString(undefined,{minimumIntegerDigits: 2});
} else if (message.action === "timeUp") {
    
    banner.innerHTML = "Times up!";
}

else if (message.action === "timePaused") {
    banner.innerHTML = "Paused";
    chrome.runtime.sendMessage({ action: "pause" });
}
else if(message.action === "reset"){
    banner.innerHTML = "Start a 25min session";
}
});



function updateDisplay(timerState) {
    timerDisplay.textContent = `${String(timerState.minutes).padStart(2, '0')}:${String(timerState.seconds).padStart(2, '0')}`;
}