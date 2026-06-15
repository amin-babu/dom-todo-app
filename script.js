// finding the elements
const container = document.querySelector('.container');
const todoForm = document.querySelector('.todo_form');
const todoInput = document.querySelector('#input_todo');
const todoAddBtn = document.querySelector('.submit_btn');
const todoLists = document.querySelector('#lists');
const message = document.querySelector('#message');

const getTodosFromLocalStorage = () => {
  return localStorage.getItem('myTodos') ? JSON.parse(localStorage.getItem('myTodos')) : [];
};

// addTodo
const addTodo = (event) => {
  event.preventDefault();
  const todoValue = todoInput.value;
  todoInput.value = '';

  // unique id
  const todoId = Date.now().toString();
  createTodo(todoId, todoValue);
  showMessage('ToDo Taks added!', 'success');

  // add on local storage
  const todos = getTodosFromLocalStorage();
  todos.push({ todoId, todoValue });
  localStorage.setItem('myTodos', JSON.stringify(todos));
};

// creating todo list
const createTodo = (uniqueID, todoValue) => {
  const todoElement = document.createElement('li');
  todoElement.id = uniqueID;
  todoElement.innerHTML = `
    <span class="todo_title">${todoValue}</span>
    <span>
      <button onclick="deleteTask(this)" class="delete_btn" id="deleteButton">
        <i class="fa-solid fa-trash"></i>
      </button>
    </span>
  `;
  todoLists.append(todoElement);
};

// adding listeners
todoForm.addEventListener('submit', addTodo);
window.addEventListener('DOMContentLoaded', () => {
  const todos = getTodosFromLocalStorage();
  todos.forEach((todo) => createTodo(todo.todoId, todo.todoValue));
});

const deleteTask = (task) => {
  const taskElement = task.parentElement.parentElement;
  todoLists.removeChild(taskElement);
  showMessage('Task Deleted!', 'delete');

  // removing from local storage
  const todos = getTodosFromLocalStorage().filter((todo) => todo.todoId !== taskElement.id);
  localStorage.setItem('myTodos', JSON.stringify(todos));
};

const showMessage = (text, status) => {
  message.style.left = '0';
  message.textContent = text;
  message.classList.add(`message-${status}`);

  setTimeout(() => {
    message.style.left = '-500px';
    message.classList.remove('message-delete');
  }, 3000);
};