export let tasks = JSON.parse(localStorage.getItem('tasks')) || [
  {
    id: 1,
    name: 'Task1',
    isDone: false
  },
  {
    id: 2,
    name: 'Task2',
    isDone: true
  },
  {
    id: 3,
    name: 'Task3',
    isDone: false
  }
];

export function findId() {
  let newId = 0;
      
  let i = 1;
  tasks.forEach((task) => {
    if (task.id === i) {
      i++;
    }
  });
  newId = i;
  return newId;
}

export function saveToStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function addNewTask(newTask) {
  const newId = findId();
  tasks.push({id: newId, name: newTask.trim(), isDone: false});
  saveToStorage();
}

export function removeTask(taskId) {
  tasks = tasks.filter(task => task.id != taskId);
  saveToStorage();
}
export function changeTaskStatus(taskId) {
  tasks.forEach((task) => {
    if (task.id === taskId) {
      task.isDone = task.isDone ? false : true;
    }
  });
  saveToStorage();
}

export function changeTaskName(taskId, newTaskName) {
  tasks.forEach((task) => {
    if (task.id === Number(taskId)) {
      task.name = newTaskName;
    }
  });
  saveToStorage();
}

