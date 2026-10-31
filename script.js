
// Get HTML Elements
let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");
let itemsLeft = document.getElementById("itemsLeft");

let clearCompleted = document.getElementById("clearCompleted");
let clearAll = document.getElementById("clearAll");

let filterButtons = document.querySelectorAll(".filter");

// Tasks Array
let tasks = [
    { text: "See Lecture", completed: false },
    { text: "Solve assignment", completed: false }
];

let currentFilter = "all";

// Display Tasks
function displayTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(function(task) {

        if (currentFilter === "active") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;
    });

    filteredTasks.forEach(function(task) {

        let li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        // Checkbox
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.onchange = function() {
            task.completed = checkbox.checked;
            displayTasks();
        };

        // Task Name
        let span = document.createElement("span");
        span.textContent = task.text;

        // Edit Task
        span.ondblclick = function() {

            let editInput = document.createElement("input");
            editInput.value = task.text;

            li.replaceChild(editInput, span);

            editInput.focus();

            function saveEdit() {
                let newText = editInput.value.trim();

                if (newText !== "") {
                    task.text = newText;
                }

                displayTasks();
            }

            editInput.onkeydown = function(event) {
                if (event.key === "Enter") {
                    saveEdit();
                }
            };

            editInput.onblur = saveEdit;
        };

        // Delete Button
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑";
        deleteBtn.className = "deleteBtn";

        deleteBtn.onclick = function() {
            tasks = tasks.filter(function(item) {
                return item !== task;
            });

            displayTasks();
        };

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    // Count Active Tasks
    let count = tasks.filter(function(task) {
        return !task.completed;
    }).length;

    itemsLeft.textContent = count + " items left";
}

// Add Task
function addTask() {

    let text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    taskInput.value = "";

    displayTasks();
}

// Add Button
addBtn.onclick = addTask;

// Enter Key
taskInput.onkeydown = function(event) {
    if (event.key === "Enter") {
        addTask();
    }
};

// Filter Tasks
filterButtons.forEach(function(button) {

    button.onclick = function() {

        currentFilter = button.dataset.filter;

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        displayTasks();
    };
});

// Clear Completed
clearCompleted.onclick = function() {

    tasks = tasks.filter(function(task) {
        return !task.completed;
    });

    displayTasks();
};

// Clear All
clearAll.onclick = function() {

    tasks = [];

    displayTasks();
};

// First Display
displayTasks();
