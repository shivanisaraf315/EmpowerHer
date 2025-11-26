const list = document.querySelector('#itemList');
const button = document.querySelector('#addBtn');

button.addEventListener('click', function () {
    const newItem = document.createElement('li');
    newItem.textContent = 'New Item';

    // Find next sequence number (index starts at 0, so +1)
    const count = list.children.length + 1;

    // Apply styling rules
    if (count % 2 === 1) {
        // Odd → bold + blue
        newItem.style.fontWeight = 'bold';
        newItem.style.color = 'blue';
    } else {
        // Even → italic + red
        newItem.style.fontStyle = 'italic';
        newItem.style.color = 'red';
    }

    // Append to list
    list.appendChild(newItem);
});
