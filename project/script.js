// script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item${task.completed ? ' completed' : ''}`;
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <div class="task-actions">
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="complete" data-index="${index}">${task.completed ? 'Uncomplete' : 'Complete'}</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    };

    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        tasks.push({ text: taskText, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = '';
    };

    const editTask = (index) => {
        const newTaskText = prompt('Edit your task:', tasks[index].text);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            tasks[index].text = newTaskText.trim();
            saveTasks();
            renderTasks();
        }
    };

    const completeTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    addTaskButton.addEventListener('click', addTask);

    taskList.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains('edit')) {
            editTask(index);
        } else if (e.target.classList.contains('complete')) {
            completeTask(index);
        } else if (e.target.classList.contains('delete')) {
            deleteTask(index);
        }
    });

    renderTasks();
});
