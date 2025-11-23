let seconds = parseInt(prompt("Enter countdown seconds:"));

let timerId = setInterval(() => {
  console.log(`Remaining: ${seconds}s`);
  seconds--;

  if (seconds < 0) {
    clearInterval(timerId);
    console.log("Countdown Complete!");
  }
}, 1000);

// Optional: pressing "s" stops countdown immediately
setTimeout(() => {
  document.addEventListener("keydown", (event) => {
    if (event.key === "s") {
      clearInterval(timerId);
      console.log("Countdown Stopped!");
    }
  });
}, 0);
