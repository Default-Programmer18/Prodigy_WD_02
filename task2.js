let isRunning = false;
let startTime;
let lapStartTime;
let lapCount = 1;

function startPause() {
    if (!isRunning) {
        isRunning = true;
        document.getElementById("startPause").textContent = "Pause";
        startTime = new Date().getTime() - (lapStartTime || 0);
        lapStartTime = 0;
        updateDisplay();
        updateButtons(true);
        runTimer();
    } else {
        isRunning = false;
        document.getElementById("startPause").textContent = "Resume";
        lapStartTime = new Date().getTime() - startTime;
        updateButtons(false);
    }
}

function reset() {
    isRunning = false;
    lapCount = 1;
    startTime = 0;
    lapStartTime = 0;
    document.getElementById("display").textContent ="00:00:00";
    updateButtons(false);
    document.getElementById("startPause").textContent = "Start";
    document.getElementById("lapList").innerHTML = "";
}

function recordLap() {
    if (isRunning) {
        const lapTime = new Date().getTime() - startTime;
        const lapListItem = document.createElement("li");
        lapListItem.textContent = `Lap ${lapCount}: ${formatTime(lapTime)}`;
        document.getElementById("lapList").appendChild(lapListItem);
        lapCount++;
        lapStartTime = new Date().getTime();
    }
}

function runTimer() {
    setTimeout(function () {
        if (isRunning) {
            updateDisplay();
            runTimer();
        }
    }, 10);
}

function updateDisplay() {
    const currentTime = new Date().getTime() - startTime;
    document.getElementById("display").textContent = formatTime(currentTime);
}

function updateButtons(running) {
    document.getElementById("reset").disabled = running;
    document.getElementById("lap").disabled = !running;
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

// Initial setup
reset();