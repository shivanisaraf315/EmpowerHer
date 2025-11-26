const colorInput = document.getElementById('colorInput');
const textInput = document.getElementById('textInput');

const bgBtn = document.getElementById('bgBtn');
const textBtn = document.getElementById('textBtn');

const box = document.getElementById('box');

// Function to check if a color is valid
function isValidColor(color) {
    const s = new Option().style;
    s.color = color;
    return s.color !== '';
}

// 1. Change Background Button
bgBtn.addEventListener('click', function () {
    const color = colorInput.value.trim();

    if (isValidColor(color)) {
        box.style.backgroundColor = color;
    } else {
        alert("Invalid color name!");
    }
});

// 2. Update Text Button
textBtn.addEventListener('click', function () {
    const text = textInput.value.trim();

    if (text === "") {
        alert("Please enter some text!");
        return;
    }

    box.textContent = text;
});
