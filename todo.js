import {tasks, removeTask, changeTaskStatus, changeTaskName, addNewTask} from './tasks.js';



function renderTasks() {
  let tasksHTML = '';
  tasks.forEach((task) => {
    let status;
    let style;
    if (task.isDone) {
      status = 'done-button';
      style = 'done-task-text';
    } else { 
      status = 'not-done-button';
    }

    tasksHTML += `
      <div class="task">
        <div class="task-content task-content-${task.id}">
          <button class="${status} js-task-done" data-id="${task.id}"></button>
          <p class="task-text js-task-name-${task.id} ${style}">${task.name}</p>
          <button class="buttons js-edit-task" data-id="${task.id}">
            <img class="edit-button" src="https://cdn-icons-png.flaticon.com/128/10573/10573605.png">
          </button>
        </div>
        <button class="buttons js-delete-task" data-id="${task.id}">
          <img class="delete-button " src="https://cdn-icons-png.flaticon.com/128/542/542724.png">
        </button>
      </div>
    `
  });

  document.querySelector('.js-task-container').innerHTML = tasksHTML;

  tasksCount();
}

function tasksCount() {
  const tasksAll = tasks.length;
  let tasksDone = 0;
  tasks.forEach((task) => {
    if (task.isDone) {
      tasksDone++;
    }
  });
  //return `${tasksDone}/${tasksAll}`;
  
  document.querySelector('.js-task-count').innerHTML = `${tasksDone}/${tasksAll}`;
}


function addTask() {
  const newTaskButton = document.querySelector('.js-task-create');
  newTaskButton.addEventListener('click',  () => {
    const newTask = document.querySelector('.js-task-input').value;

    if (newTask) {
      addNewTask(newTask);
      document.querySelector('.js-task-input').value = '';
      renderTasks();
    }
  });  
}


function enterTask() {
  const input = document.querySelector('.js-task-input');
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const newTask = document.querySelector('.js-task-input').value;
      if (newTask) {
        addNewTask(newTask);
        document.querySelector('.js-task-input').value = '';
        renderTasks();
      }
    }
  });
}


function deleteTask() {
  document.querySelector('.js-task-container').addEventListener('click', (event) => {
    const deleteButton = event.target.closest('.js-delete-task');
    if (!deleteButton) return;

    const taskId = deleteButton.dataset.id;

    removeTask(taskId);
    renderTasks();
  });
}
deleteTask();

function taskDone() {
  document.querySelector('.js-task-container').addEventListener('click', (event) => {
    const doneButton = event.target.closest('.js-task-done');
    if (!doneButton) return;
    const taskId = doneButton.dataset.id;
    changeTaskStatus(Number(taskId));
    renderTasks();
  });
}

function editTask() {

  document.querySelector('.js-task-container').addEventListener('click', (event) => {
    
    editTaskContent(event);

    saveEditedTask(event);
  });
}

function editTaskContent(event) {
  const editButton = event.target.closest('.js-edit-task');
  if (editButton) {
    const taskId = editButton.dataset.id;
  
    const taskElement = document.querySelector(`.js-task-name-${taskId}`);
    if(!taskElement) return;
    const taskName = taskElement.innerText;
    

    const taskHTML = `
      <input class="edit-task js-new-task-name-${taskId}" value="${taskName}">
      <button class="buttons js-done-task-name" data-id="${taskId}">
        <img class="edit-button" src="https://cdn-icons-png.flaticon.com/128/709/709510.png">
      </button>
    `
    
    document.querySelector(`.task-content-${taskId}`).innerHTML = taskHTML;


    const editInput = document.querySelector(`.js-new-task-name-${taskId}`);
    editInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const taskContainer = editInput.closest(`.task-content-${taskId}`);
        const newTaskName = taskContainer.querySelector(`.js-new-task-name-${taskId}`).value;

        changeTaskName(taskId, newTaskName);
        renderTasks();
      } else if (event.key === 'Escape') {
        renderTasks();
      }
    }) 
  }
}

function saveEditedTask(event) {
  const saveEditButton = event.target.closest('.js-done-task-name');
  if (saveEditButton) {
    const taskId = saveEditButton.dataset.id;

    const taskContainer = saveEditButton.closest(`.task-content-${taskId}`);
    const newTaskName = taskContainer.querySelector(`.js-new-task-name-${taskId}`).value;

    changeTaskName(taskId, newTaskName);
    renderTasks();
  } 
}


addTask();
enterTask();
deleteTask();
taskDone();
editTask();
renderTasks();
