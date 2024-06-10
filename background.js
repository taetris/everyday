class Timer {
    constructor(minutes = 25, breakMinutes = 1) {
        this.state = {
            running: false,
            minutes: minutes,
            seconds: 4,
            isBreak: false,
            breakMinutes: breakMinutes,
            workMinutes: minutes,
            isTimeUp: false,
            message: "Start a 25min session",
        };
        this.timerInterval = null;
    }

    startTimer() {
        console.log(this.state);
        if(this.state.running) return;
        this.state.running = true;
        if (this.state.isBreak) {
            this.state.minutes = this.state.breakMinutes;
            this.state.message = "5min break";
        }else{
            this.state.minutes = this.state.workMinutes;
            this.state.message = "25min session";
        }
        this.timerInterval = setInterval(() => {
            const countdown = () => {
                
                if (this.state.seconds === 0) {
                    if (this.state.minutes === 0) {
                        return true;
                        
                    } else {
                        this.state.seconds = 59;
                        this.state.minutes--;
                    }
                } else {
                    this.state.seconds--;
                }

                if(countdown){
                    this.state.isTimeUp = !this.state.isTimeUp;
                    this.state.running = false;
                    this.state.isBreak = !this.state.isBreak;

                    clearInterval(this.timerInterval);
                    console.log("exit", this.state);
                    if(this.state.isTimeUp){
                        this.state.message = "Times up!";
                        this.state.isTimeUp = !this.state.isTimeUp
                        chrome.runtime.sendMessage({ action: "timeUp", timerState: this.state });
                    }
                }
            }

            chrome.runtime.sendMessage({ action: "update", timerState: this.state });
        }, 1000);
    }

    pauseTimer() {
        if (!this.state.running) return;
        this.state.running = false;
        
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

const obj = new Timer(1, 1);
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