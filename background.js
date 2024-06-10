class Timer {
    constructor(minutes = 25, breakMinutes = 5) {
        this.state = {
            running: false,
            minutes: minutes,
            seconds: 0,
            isBreak: false,
            breakMinutes: breakMinutes,
            workMinutes: minutes,
            isTimeUp: false,
            message: "Start a 25min session",
        };
        this.timerInterval = null;
    }

    startTimer() {
        
        if(this.state.running) return;
        this.state.running = true;
        this.state.message = this.state.isBreak ? "5min break" : "25min session";
        this.timerInterval = setInterval(() => {
            if (this.state.seconds === 0) {
                if (this.state.minutes === 0) {
                    
                    this.timerEnd();
                } else {
                    this.state.seconds = 59;
                    this.state.minutes--;
                }
            } else {
                this.state.seconds--;
            }
            chrome.runtime.sendMessage({ action: "update", timerState: this.state });
        }, 1000);
    }

    timerEnd() {
        this.state.running = false;
        this.state.isBreak = !this.state.isBreak;
        this.state.minutes = this.state.isBreak ? this.state.breakMinutes : this.state.workMinutes;
        this.state.message = "Times up!";

        clearInterval(this.timerInterval);
        chrome.runtime.sendMessage({ action: "timeUp", timerState: this.state });
    }

    pauseTimer() {
        if (!this.state.running) return;
        this.state.running = false;
        clearInterval(this.timerInterval);
        this.state.message = "Paused";
        chrome.runtime.sendMessage({ action: "timePaused", timerState: this.state });
    }

    resetTimer() {
        if (!this.state.running) return;
        this.state.running = false;
        clearInterval(this.timerInterval);
        this.state.seconds = 0;
        this.state.minutes = this.state.workMinutes;
        this.state.isBreak = false;
        this.state.message = "Start a 25min session, reset";
        chrome.runtime.sendMessage({ action: "reset", timerState: this.state });
    }
}

const obj = new Timer(25, 5);
console.log("obj")
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if(message.action == "start"){
        
        if(obj.state.running === false){
            obj.startTimer();
        }else{
            obj.pauseTimer();
        } 
    }   
        
    else if(message.action === "reset"){
        obj.resetTimer();

    }
});