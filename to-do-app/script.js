const API_URL = 
  "https://jsonplaceholder.typicode.com/todos";

let todos = [];

const todoForm = 
  document.querySelector("#todo-form");

const todoInput = 
  document.querySelector("#todo-input");

const todoList = 
  document.querySelector('#todo-list');

const searchInput = 
  document.querySelector('#search-input');

const loading = 
  document.querySelector('#loading');



function saveTodos(){

  localStorage.setItem("todos", JSON.stringify(todos));

}


function loadFromStorage(){

  const savedTodos = 
    localStorage.getItem("todos");

  if (savedTodos){
    todos = JSON.parse(savedTodos);

    return true;
  }

  return false;
}



function renderTodos(todoArray = todos){
  todoList.innerHTML = '';

  todoArray.forEach(function(todo){

    const li = document.createElement("li");

    li.innerHTML = `
    <span class="todo-title ${todo.completed ? "completed" : ""}">
    ${todo.title}
    </span>

    <div class="actions">

      <button
        class="complete-btn"
        data-id = "${todo.id}"
      >
      ${todo.completed ? "Undo" : "Complete"}
      </button>

      <button
        class="edit-btn"
        data-id="${todo.id}"
      >
      Edit
      </button>

      <button
        class="delete-btn"
        data-id="${todo.id}"
      >
        Delete
      </button>


    </div>
    `;

    todoList.appendChild(li);
  });
}



todoForm.addEventListener(
  "submit",
  function(event){
    event.preventDefault();

    const title = 
      todoInput.value.trim();

    if (title === ""){
      return;
    }

    const newTodo = {
      id: Date.now(),
      title: title,
      completed: false
    };

    todos.unshift(newTodo);

    saveTodos();

    renderTodos();

    todoInput.value = "";
    
  }
);


todoList.addEventListener(
  "click",
  function(event){

    const id = 
      Number(event.target.dataset.id);

    if(
      event.target.classList.contains(
        "complete-btn"
      )
    ) {

      toggleTodo(id);
    }

    if(
      event.target.classList.contains(
        "edit-btn"
      )
    ){
      editTodo(id);
    }

    if(
      event.target.classList.contains(
        "delete-btn"
      )
    ){
      deleteTodo(id);
    }
  }
);


function toggleTodo(id){

  const todo = 
    todos.find(function(todo){
      return todo.id === id;
    });

  if(!todo){
    return;
  }

  todo.completed = !todo.completed;

  saveTodos();

  renderTodos();
}

function editTodo(id){

  const todo = 
    todos.find(function(todo){
      return todo.id === id;
    });

  if(!todo){
    return;
  }
  
  const newTitle = 
    prompt("Edit todo:", todo.title);

  if(newTitle === null){
    return;
  }

  const title = newTitle.trim();

  if(title === ""){
    return;
  }

  todo.title = title;

  saveTodos();

  renderTodos();
}

function deleteTodo(id){

  todos = todos.filter(function(todo){

    return todo.id !== id;

  });

  saveTodos();

  renderTodos();
}


async function loadTodosFromAPI() {
  
  try{
    const reponse = 
      await fetch(API_URL);

    if(!reponse.ok) {
      throw new Error(
        "Failed to fetch todos"
      );
    }

    const data = 
      await reponse.json();

    todos = data.slice(0, 10);

    saveTodos();

    renderTodos();
  } catch(error) {

    console.error(error);

    todoList.innerHTML = 
    "<li>Failed to load todos.</li>";


  }

}


function debounce(callback, delay) {

  let timer;

  return function() {
    clearTimeout(timer);
     
    timer = setTimeout(function() {

      callback();
    }
    , delay);
  };
}


const searchTodos = debounce(
  function() {

    const searchText = 
    searchInput.value
    .toLowerCase()
    .trim();

    const filteredTodos= 
      todos.filter(function(todo){

        return todo.title
        .toLowerCase()
        .includes(searchText);

      });

    renderTodos(filteredTodos);
  },

  300
);

searchInput.addEventListener(
  "input",
  searchTodos
);


async function initializeApp() {
  const hasSavedTodos = 
    loadFromStorage();

  if(hasSavedTodos){
    renderTodos();
  
  } else{
    await loadTodosFromAPI();
  }

  loading.style.display = "none";
}

initializeApp();