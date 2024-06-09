let timerState = {
    running: false,
    minutes: 0,
    seconds: 5,
    isBreak: false,
}
let timerInterval;


console.log(timerState);
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if(message.action == "start"){
        startTimer();

    }else if(message.action === "pause"){
        pauseTimer();
        
    }else if(message.action === "reset"){
        resetTimer();

    }else if(message.action === "getTimerState"){
        sendResponse(timerState);
    }
});


const startTimer = () => {   
    console.log(timerState);
    if (timerState.running) return;
    timerState.running = true;

    timerInterval = setInterval(() => {
        if(timerState.seconds === 0){
            if(timerState.minutes === 0){
                timerState.running = false;
                timerState.isBreak = !timerState.isBreak;
                timerState.minutes = timerState.isBreak ? 1 : 25;

                clearInterval(timerInterval);
                console.log("exit",timerState);
                chrome.runtime.sendMessage({action:"timeUp", isBreak: timerState.isBreak});
            }else{
                timerState.seconds = 59;
                timerState.minutes--;
            }   
        }else{
            timerState.seconds--;
        }
        chrome.runtime.sendMessage({ action: "update", timerState });
  }, 1000);
        
    }

    const pauseTimer = () => {
        timerState.running = false;
        clearInterval(timerInterval);

        chrome.runtime.sendMessage({action:"timePaused", isBreak: timerState.isBreak});
    }