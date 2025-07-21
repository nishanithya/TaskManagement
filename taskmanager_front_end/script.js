const apiUrl = "http://localhost:8080/api/tasks";
let editTaskId = null;

document.getElementById("taskForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const task = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value,
        dueDate: document.getElementById("dueDate").value
    };

    const method = editTaskId ? "PUT" : "POST";
    const url = editTaskId ? `${apiUrl}/${editTaskId}` : apiUrl;

    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    }).then(response => response.json())
      .then(data => {
          alert(editTaskId ? "Task updated!" : "Task added!");
          resetForm();
          fetchTasks();
      });
});

function fetchTasks() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(tasks => {
            const container = document.getElementById("tasksContainer");
            container.innerHTML = "";
            tasks.forEach(task => {
                const div = document.createElement("div");
                div.className = "task";
                div.innerHTML = `
                    <strong>${task.title}</strong><br>
                    ${task.description}<br>
                    ${task.category} - ${task.status}<br>
                    Due: ${task.dueDate}<br><br>
                    <button onclick="editTask(${task.id})">✏️ Edit</button>
                    <button onclick="deleteTask(${task.id})">🗑️ Delete</button>
                `;
                container.appendChild(div);
            });
        });
}

function editTask(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(task => {
            document.getElementById("title").value = task.title;
            document.getElementById("description").value = task.description;
            document.getElementById("category").value = task.category;
            document.getElementById("status").value = task.status;
            document.getElementById("dueDate").value = task.dueDate;
            editTaskId = task.id;

            // Update button text
            document.querySelector("#taskForm button").textContent = "🔄 Update Task";
        });
}

function deleteTask(id) {
    if (confirm("Are you sure you want to delete this task?")) {
        fetch(`${apiUrl}/${id}`, {
            method: "DELETE"
        }).then(() => {
            alert("Task deleted!");
            fetchTasks();
        });
    }
}

function resetForm() {
    document.getElementById("taskForm").reset();
    editTaskId = null;
    document.querySelector("#taskForm button").textContent = "➕ Add Task";
}

// Load tasks on page load
fetchTasks();
