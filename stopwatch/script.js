console.log("script is attached");
let hours = 0;  //// initialize the hours //
let minutes = 0;   //// initialize the minutes //
let seconds = 0;  //// initialize the seconds //

let hoursDisplay = document.getElementById("hours");
let minutesDisplay = document.getElementById("minutes");
let secondsDisplay = document.getElementById("seconds");
let startTimer = document.querySelector(".start");
let stopWatchTimer = document.querySelector(".stop");
let resetWatchTimer = document.querySelector(".reset");
let timerId;
let isRunning = false;

let stopWatch = () => { // stopwatch Function //
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;

        if (minutes ===60) {
            minutes = 0;
            hours++;
            hours.innerHTML = hours;
        }
    }

    secondsDisplay.innerHTML = String(seconds).padStart(2, "0"); // view increasing seconds in double digit format //
    minutesDisplay.innerHTML = String(minutes).padStart(2, "0");  // view increasing minutes in double digit format //
    hoursDisplay.innerHTML = String(hours).padStart(2, "0");  // view increasing hours in double digit format //


};

startTimer.addEventListener("click", () => {

    if (!isRunning) {
        // Start the timer
        timerId = setInterval(stopWatch, 1000); // start Stopwatch Icon //
        startTimer.querySelector("i").classList.remove("fa-play"); // toggle bwteen play pause icon
        startTimer.querySelector("i").classList.add("fa-pause");
        isRunning = true;
    } else {
        // Pause the timer
        clearInterval(timerId);
        startTimer.querySelector("i").classList.remove("fa-pause");
        startTimer.querySelector("i").classList.add("fa-play");
        isRunning = false;
    }
    console.log("button clicked");
    // timerId = setInterval(stopWatch,1000)
});

stopWatchTimer.addEventListener("click", () => {
    clearInterval(timerId); //stop timer //
    startTimer.querySelector("i").classList.remove("fa-pause");
    startTimer.querySelector("i").classList.add("fa-play");
    isRunning = false;
});
resetWatchTimer.addEventListener("click", () => { //reset timer //
    clearInterval(timerId); 
    startTimer.querySelector("i").classList.remove("fa-pause");
    startTimer.querySelector("i").classList.add("fa-play");
    isRunning = false;
    console.log("reset button clicked");
    clearInterval(timerId)
    seconds=0;
    minutes=0;
    hours=0;
    secondsDisplay.innerHTML = String(seconds).padStart(2, "0");
    minutesDisplay.innerHTML = String(minutes).padStart(2, "0");
    hoursDisplay.innerHTML = String(hours).padStart(2, "0");

});

