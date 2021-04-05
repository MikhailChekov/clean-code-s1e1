//get containers
const taskInput = document.getElementById("new-task__input");
const addButton = document.getElementById("new-task__btn");
const activeTasksList = document.getElementById("active-tasks__list");
const doneTasksList = document.getElementById("done-tasks__list");

// add new task handler
addButton.addEventListener("click", addTask);

// add 'done' to new element of list
for (let i = 0; i < activeTasksList.children.length; i++) {
  bindHandlers(activeTasksList.children[i], makeDone);
}

// add 'aktive' to new element of list
for (let i = 0; i < doneTasksList.children.length; i++) {
  bindHandlers(doneTasksList.children[i], makeActive);
}

//make task completed
function makeDone() {

  const listItem = this.parentNode;
  doneTasksList.appendChild(listItem);
  bindHandlers(listItem, makeActive);

}

// make task active
function makeActive() {

  const listItem = this.parentNode;
  activeTasksList.appendChild(listItem);
  bindHandlers(listItem, makeDone);

}

function bindHandlers(taskListItem, handleCheckbox) {

  //select ListItems children
  const checkBox = taskListItem.querySelector(".task__checkbox");
  const editButton = taskListItem.querySelector(".task__edit-btn");
  const deleteButton = taskListItem.querySelector(".task__delete-btn");

  // bind handlers
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = handleCheckbox;

}

function deleteTask() {

  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  ul.removeChild(listItem);

}


function editTask() {

  const listItem = this.parentNode;
  const editInput = listItem.querySelector('.task__input');
  const label = listItem.querySelector(".task__label");
  const editBtn = listItem.querySelector(".task__edit-btn");
  const containsClass = listItem.classList.contains("task_edit");

  // toggle 'save/edit' mode
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("task_edit");
};

function addTask() {

  if (!taskInput.value) return;
  const listItem = createNewTask(taskInput.value);

  //Append listItem to activeTasksList
  activeTasksList.appendChild(listItem);
  bindHandlers(listItem, makeDone);

  //clear input value
  taskInput.value = "";

}

function createNewTask(task) {

  // create task elements
  let listItem = document.createElement("li");
  let checkBox = document.createElement("input");
  let label = document.createElement("label");
  let editInput = document.createElement("input");
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");
  let deleteButtonImg = document.createElement("img");

  // fill task attributes of elements
  listItem.className = "active-task__item task";
  label.innerText = task;
  label.className = "task__label";
  checkBox.type = "checkbox";
  checkBox.className = "task__checkbox";
  editInput.type = "text";
  editInput.className = "task__input input-text";
  editButton.innerText = "Edit";
  editButton.className = "task__edit-btn btn";
  deleteButton.className = "task__delete-btn btn";
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = "task__btn-img_d";

  // append elements into main element
  deleteButton.appendChild(deleteButtonImg);
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
  
}