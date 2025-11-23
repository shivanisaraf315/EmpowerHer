// Function that runs a timer and calls onComplete when finished
function timer(duration, onComplete) {
  setTimeout(() => {
    const message = `Timer of ${duration} ms finished`;
    onComplete(message);
  }, duration);
}

// Example usage
timer(2000, (msg) => {
  console.log(msg); // "Timer of 2000 ms finished" after 2 seconds
});
