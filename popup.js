const timer = document.getElementById('timer');
const start = document.getElementById('start');

const reset = document.getElementById('reset');
const banner = document.getElementById('banner');



start.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "start" });
    console.log("mes sent")
  });

 
reset.addEventListener('click', () => {
    
    chrome.runtime.sendMessage({ action: "reset" });
});




chrome.runtime.onMessage.addListener((message) => {
    banner.innerHTML = message.timerState.message; 

if (message.action === "update") {
    const { minutes, seconds } = message.timerState;
    timer.innerHTML = minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 }) + ":" + seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 });
   
} else if (message.action === "timeUp") {
    
    
    let mySound = new Audio('alarm.wav');
    mySound.play();
    // playAlarm();
}

else if (message.action === "timePaused") {
    
    chrome.runtime.sendMessage({ action: "pause" });
}
else if(message.action === "reset"){
    
    timer.innerHTML = message.timerState.minutes.toLocaleString(undefined,{minimumIntegerDigits: 2}) + ":" + message.timerState.seconds.toLocaleString(undefined,{minimumIntegerDigits: 2});
}

    
banner.innerHTML = message.timerState.message; 

});



function updateDisplay(timerState) {
    timerDisplay.textContent = `${String(timerState.minutes).padStart(2, '0')}:${String(timerState.seconds).padStart(2, '0')}`;
}