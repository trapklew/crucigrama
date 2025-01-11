let timer;
let timeLeft = 0;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

// Start the timer
function startTimer(durationInSeconds, displayElement) {
  timeLeft = durationInSeconds; // Set the duration of the timer
  displayElement.innerText = formatTime(timeLeft); // Initial display of time
  // Start countdown
  timer = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(timer); // Stop the timer
      alert("Time's up! You did not finish in time.");
    } else {
      displayElement.innerText = formatTime(timeLeft); // Update timer display
      timeLeft--; // Decrease time by 1 second
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer); // Stop the timer
}

function resetTimer(durationInSeconds, displayElement) {
  clearInterval(timer); // Clear any ongoing timer
  timeLeft = durationInSeconds; // Reset the time
  displayElement.innerText = formatTime(timeLeft); // Reset the display
}
