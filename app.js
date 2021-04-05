

//get containers
const taskInput = document.getElementById("new-task__input");
const addButton = document.getElementById("new-task__btn");
const activeTasksList = document.getElementById("active-tasks");
const doneTasksList = document.getElementById("done-tasks__list");


const createNewTask = function (task) {

    // create task elements
    let listItem = document.createElement("li");
    let checkBox = document.createElement("input");
    let label = document.createElement("label");
    let editInput = document.createElement("input");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");
    let deleteButtonImg = document.createElement("img");

    // fill task attributes of elements
    label.innerText = task;
    label.className = "task__label";
    checkBox.type = "checkbox";
    editInput.type = "text";
    editInput.className = "task";
    editButton.innerText = "Edit";
    editButton.className = "task__edit-btn btn";
    deleteButton.className = "task__delete-btn btn";
    deleteButtonImg.src = './remove.svg';

    // append elements into main element
    deleteButton.appendChild(deleteButtonImg);
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    
    return listItem;
}

const addTask = function () {
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    const listItem = createNewTask(taskInput.value);

    //Append listItem to doneTasksList
    doneTasksList.appendChild(listItem);
    bindEvents(listItem, makeDone);

    taskInput.value = "";

}

//Edit an existing task.

var editTask = function () {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem = this.parentNode;

    var editInput = listItem.querySelector('input[type=text]');
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector(".edit");
    var containsClass = listItem.classList.contains("editMode");
    //If class of the parent is .editmode
    if (containsClass) {

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("editMode");
};


//Delete task.
var deleteTask = function () {
    console.log("Delete Task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//make task completed
const makeDone = function () {
    console.log("Complete Task...");

    //Append the task list item to the #done-tasks-list
    var listItem = this.parentNode;
    doneTasksList.appendChild(listItem);
    bindEvents(listItem, makeActive);

}

// make task active
const makeActive = function () {

    const listItem = this.parentNode;
    doneTasksList.appendChild(listItem);
    bindEvents(listItem, makeDone);
}




//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


const bindEvents = function (taskListItem, checkBoxEventHandler) {

    //select ListItems children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("edit");
    var deleteButton = taskListItem.querySelector("button.delete");


    //Bind editTask to buttons
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

// apply events handler to completed
for (var i = 0; i < doneTasksList.children.length; i++) {
    //bind events to list items chldren(tasksCompleted)
    bindEvents(doneTasksList.children[i], makeDone);
}

//cycle over doneTasksList ul list items
for (var i = 0; i < doneTasksList.children.length; i++) {
    //bind events to list items chldren(tasksIncompleted)
    bindEvents(doneTasksList.children[i], makeActive);
}