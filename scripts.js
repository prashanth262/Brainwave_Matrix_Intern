document.addEventListener("DOMContentLoaded", displayTasks);

function addTask() {
    let taskInput = document.getElementById("task").value;
    let timeInput = document.getElementById("time").value;
    
    if (taskInput === "") {
        alert("Task cannot be empty!");
        return;
    }

    let currentDate = new Date().toISOString().split('T')[0]; // Get today's date (YYYY-MM-DD)

    saveTask(currentDate, taskInput, timeInput);
    displayTasks(); // Immediately refresh task list
    
    document.getElementById("task").value = "";
    document.getElementById("time").value = "";
}

function saveTask(date, task, time) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
    
    if (!tasks[date]) {
        tasks[date] = [];
    }
    
    tasks[date].push({ task, time });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
    let taskContainer = document.getElementById("taskContainer");
    taskContainer.innerHTML = ""; // Clear previous content

    Object.keys(tasks).forEach(date => {
        let dateSection = document.createElement("div");
        dateSection.classList.add("task-section");
        dateSection.innerHTML = `<h3>${date}</h3><ul id="list-${date}"></ul>`;
        taskContainer.appendChild(dateSection);

        tasks[date].forEach((t, index) => {
            let li = document.createElement("li");
            li.innerHTML = `${t.task} <small>${t.time}</small> 
                            <button class="delete-btn" onclick="deleteTask('${date}', ${index})">X</button>`;
            document.getElementById(`list-${date}`).appendChild(li);
        });
    });
}

function deleteTask(date, index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
    
    if (tasks[date]) {
        tasks[date].splice(index, 1);
        if (tasks[date].length === 0) {
            delete tasks[date];
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    }
}
