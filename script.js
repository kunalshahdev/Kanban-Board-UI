const taskInput = document.getElementById('taskInput');
const columnSelect = document.getElementById('columnSelect');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const inProgressList = document.getElementById('inProgressList');
const doneList = document.getElementById('doneList');

let draggedTask = null;

function getList(column) {
  if (column === 'todo') return todoList;
  if (column === 'in-progress') return inProgressList;
  return doneList;
}

function createTask(title) {
  const task = document.createElement('div');
  task.className = 'task';
  task.draggable = true;

  const titleSpan = document.createElement('span');
  titleSpan.className = 'title';
  titleSpan.textContent = title;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.innerHTML = '&times;';
  deleteBtn.addEventListener('click', function () {
    task.remove();
  });

  task.appendChild(titleSpan);
  task.appendChild(deleteBtn);

  task.addEventListener('dragstart', function () {
    draggedTask = task;
    task.classList.add('dragging');
  });

  task.addEventListener('dragend', function () {
    draggedTask = null;
    task.classList.remove('dragging');
    document.querySelectorAll('.task-list').forEach(function (list) {
      list.classList.remove('drag-over');
    });
  });

  return task;
}

document.querySelectorAll('.task-list').forEach(function (list) {
  list.addEventListener('dragover', function (e) {
    e.preventDefault();
    list.classList.add('drag-over');
  });

  list.addEventListener('dragleave', function () {
    list.classList.remove('drag-over');
  });

  list.addEventListener('drop', function (e) {
    e.preventDefault();
    list.classList.remove('drag-over');
    if (draggedTask && draggedTask.parentNode !== list) {
      list.appendChild(draggedTask);
    }
  });
});

addBtn.addEventListener('click', function () {
  const title = taskInput.value.trim();
  if (title === '') {
    alert('Please enter a task title.');
    return;
  }

  const column = columnSelect.value;
  const list = getList(column);
  const task = createTask(title);
  list.appendChild(task);
  taskInput.value = '';
  taskInput.focus();
});

taskInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addBtn.click();
  }
});
