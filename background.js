let currentTabId;
let intervalId;
console.log("from background");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // console.log("from background");
    if (message.action === 'startFreezing') {
        currentTabId = sender.tab.id;
        startFreezingTabs();
    } else if (message.action === 'stopFreezing') {
        stopFreezingTabs();
    }
});

function startFreezingTabs() {
    // console.log("from background");
    intervalId = setInterval(() => {
        chrome.tabs.update(currentTabId, { active: true });
    }, 100);
}

function stopFreezingTabs() {
    // console.log("from background");
    if (intervalId) {
        clearInterval(intervalId);
    }
}
