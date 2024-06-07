const timer = document.getElementById('timer');
const start = document.getElementById('start');
const pause = document.getElementById('pause');

const startTimer = () => {
    let seconds = timer.textContent;
    console.log("seconds", seconds);
}

start.addEventListener('click', startTimer);
// pause.addEventListener('click', pauseTimer);

