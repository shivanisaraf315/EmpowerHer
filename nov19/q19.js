// 1. Declare a global variable
let age = 20;

// 2. Function that displays the global variable
function displayAge() {
    console.log("Age inside displayAge:", age);
}

// 3. Function that updates the global variable
function changeAge() {
    age = 30;  
    console.log("Age after changeAge:", age);
}

// Calling the functions
displayAge();   // logs 20
changeAge();    // updates age to 30 and logs 30
displayAge();   // logs 30
