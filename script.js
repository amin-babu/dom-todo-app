// finding the elements
const container = document.querySelector('.container');
const todoForm = document.querySelector('.todo_form');
const todoInput = document.querySelector('#input_todo');
const todoAddBtn = document.querySelector('.submit_btn');
const todoLists = document.querySelector('#lists');
const message = document.querySelector('#message');

// addTodo
const addTodo = (event) => {
  event.preventDefault();
  const todoValue = todoInput.value;

  // unique id
  const todoId = Date.now().toString();
  createTodo(todoId, todoValue);
  showMessage('ToDo Taks added!', 'success');
};

// adding listeners
todoForm.addEventListener('submit', addTodo);

// creating todo list
const createTodo = (uniqueID, todoValue) => {
  const todoElement = document.createElement('li');
  todoElement.id = uniqueID;
  todoElement.innerHTML = `
    <span class="todo_title">${todoValue}</span>
    <span>
      <button class="delete_btn" id="deleteButton">
        <i class="fa-solid fa-trash"></i>
      </button>
    </span>
  `;
  todoLists.append(todoElement);
};

const showMessage = (text, status) => {
  message.style.display = 'block';
  message.textContent = text;
  message.classList.add(`message-${status}`);

  setTimeout(() => {
    todoInput.value = '';
    message.style.display = 'none';
  }, 1500);
};