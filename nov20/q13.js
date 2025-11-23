let count = 0;

const intervalId = setInterval(() => {
  console.log("Loading...");
  count++;

  if (count === 5) {
    clearInterval(intervalId);
    console.log("Loaded successfully!");
  }
}, 1000);
