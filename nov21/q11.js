// Function to display a greeting message
function displayMessage(name) {
  console.log(`Hello, ${name}!`);
}

// Function that simulates fetching a username after 1 second
function getUserInput(callback) {
  setTimeout(() => {
    const username = "Alice"; // simulated fetched username
    callback(username);       // call the callback with the name
  }, 1000);
}

// Call getUserInput and pass displayMessage as the callback
getUserInput(displayMessage);
