document.addEventListener('DOMContentLoaded', () => {
    const taskinput = document.getElementById('task-input');
    const addtaskbutton = document.getElementById('add-task-button');
    const todolist = document.getElementById('todo-list');
    const completedlist = document.getElementById('completed-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTask() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        todolist.innerHTML = '';
        completedlist.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task';
            taskItem.innerHTML = `
        <span class="${task.completed ? 'completed-task' : ''}">${task.text}</span>
        <div>
            <button onclick="editTask(${index})">✏️</button>
            <button onclick="deleteTask(${index})">🗑️</button>
            <button onclick="toogleTaskCompletion(${index})">✔️</button>
        </div>
        `;

            if (task.completed) {
                completedlist.appendChild(taskItem);
            }
            else {
                todolist.appendChild(taskItem)
            }
        });
    }

    window.editTask = (index) => {
        const newText = prompt('Edit your task', tasks[index].text);
        if (newText) {
            tasks[index].text = newText;
            saveTask();
            renderTasks();
        }
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTask();
        renderTasks();
    };

    window.toogleTaskCompletion = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTask();
        renderTasks();
    };

    addtaskbutton.addEventListener('click', () => {
        const taskText = taskinput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskinput.value = '';
            saveTask();
            renderTasks();
        }
    });

    renderTasks();
});