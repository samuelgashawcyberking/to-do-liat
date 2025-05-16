document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const todoForm = document.getElementById('todo-form');

    // Load saved tasks from localStorage
    const loadTasks = () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(task => {
            addTaskToDOM(task.text, task.completed);
        });
    };

    // Add a task to the DOM
    const addTaskToDOM = (taskText, isCompleted = false) => {
        const li = document.createElement('li');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = isCompleted;
        
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        taskSpan.className = 'task-text';
        if (isCompleted) {
            taskSpan.style.textDecoration = 'line-through';
            taskSpan.style.opacity = '0.7';
        }
        
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.className = 'delete-btn';
        
        li.appendChild(checkbox);
        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
        
        // Event listeners
        checkbox.addEventListener('change', (e) => {
            taskSpan.style.textDecoration = e.target.checked ? 'line-through' : 'none';
            taskSpan.style.opacity = e.target.checked ? '0.7' : '1';
            saveTasks();
        });
        
        deleteBtn.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });
    };

    // Save tasks to localStorage
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('#todo-list li').forEach(li => {
            tasks.push({
                text: li.querySelector('.task-text').textContent,
                completed: li.querySelector('.task-checkbox').checked
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add new task
    const addTask = (event) => {
        event.preventDefault();
        const taskText = todoInput.value.trim();
        if (!taskText) return;
        
        addTaskToDOM(taskText);
        todoInput.value = '';
        saveTasks();
    };

    // Load saved tasks when page opens
    loadTasks();

    // Event listeners
    todoForm.addEventListener('submit', addTask);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask(e);
    });
});