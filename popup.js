const timer = document.getElementById('timer');
const start = document.getElementById('start');
const pause = document.getElementById('pause');

const startTimer = () => {
    let seconds = timer.textContent;
    console.log("seconds", seconds);
}

start.addEventListener('click', startTimer);
// pause.addEventListener('click', pauseTimer);

document.addEventListener('DOMContentLoaded', () => {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = "Some timer time";
    console.log("timerElement", timerElement);
    let time = 5; 
    const timerInterval = setInterval(() => {
        if (time > 0) {
            time--;
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        } 
        else {
            console.log("timer finished");
            clearInterval(timerInterval);
            chrome.tabs.query({}, (tabs) => {
                tabs.forEach((tab) => {
                    console.log(tab.id);
                    console.log("hello");
                    // Perform actions on each tab here
                    chrome.tabs.executeScript(tab.id, {
                        code: 'alert("Your alert message here");'
                      });
                });
            });
            // Send a message to the background script to start freezing tabs
            // chrome.runtime.sendMessage({ action: 'startFreezing' });
        }
    }, 1000);
});
