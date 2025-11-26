const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();

  // Do not add empty tasks
  if (text === '') {
    alert('Please enter a task.');
    return;
  }

  // Create li
  const li = document.createElement('li');

  // Task text span
  const span = document.createElement('span');
  span.textContent = text;
  li.appendChild(span);

  // Complete button
  const completeBtn = document.createElement('button');
  completeBtn.textContent = 'Complete';
  completeBtn.addEventListener('click', () => {
    span.classList.toggle('completed');
  });
  li.appendChild(completeBtn);

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(li);
  });
  li.appendChild(deleteBtn);

  // Add li to list
  taskList.appendChild(li);

  // Clear input
  taskInput.value = '';
  taskInput.focus();
});
