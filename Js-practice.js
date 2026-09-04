// Variables

let globalCount = 0;

function processUser(user) {
  let attempts =0;
  const MAX_ATTEMPTS = 3;

  if (typeof user !== "object" || user === null){
    console.log("Invalid user");
    return;
  }

  const isAdmin = user instanceof Admin;
  const displayName= user.profile?.name ?? "Anonymous";
  const email = user.profile?.contact?.getEmail?.();
  const ageNumber = Number(user.age);
  const ageMessage = "Age: " + user.age;
  const isMatch = user.id == "101";
  const isStrictMatch = user.id === 101;

  attempts++;
  attempts ||= 1;
  user.role &&= user.role.toUpperCase();
  user.theme ??= "dark";
  const total = 10 + 5 * 2 % 7;
  const status = attempts < MAX_ATTEMPTS && !isAdmin ? "Limited Access" : "Full access";

  globalCount++;
  console.log({ displayName, email, ageNumber, ageMessage, isMatch, isStrictMatch, total, status });
  console.log(attempts);
  console.log(globalCount);
}

class Admin {}
const currentUser = new Admin();
currentUser.profile = { name: "Hari" };
currentUser.age = '25';
currentUser.id = 101;

processUser(currentUser);

// Functions

console.log(greetDeclaration("Hari"));
function greetDeclaration(name) {
 return `Hello, ${name}!`;
}
const greetExpression = function (name = "friend") {
 return `Hi, ${name}!`;
};
const sumAll = (...numbers) => {
 return numbers.reduce((total, n) => total + n, 0);
};
function createCounter() {
 let count = 0;
 return function () {
 count++;
 return count;
 };
}
const counter = createCounter();
console.log(counter());
console.log(counter());
function processArray(arr, callback) {
 const results = [];
 for (const item of arr) {
 results.push(callback(item));
 }
 return results;
}
const doubled = processArray([1, 2, 3], function double(n) {
 return n * 2;
});
function addPure(a, b) {
 return a + b;
}
const config = (function () {
 const secretKey = "abc123";
 return { key: secretKey };
})();
function doesNothing() {
 console.log("side effect only");
}
const nothing = doesNothing();
console.log(greetExpression());
console.log(sumAll(1, 2, 3, 4));
console.log(doubled);
console.log(addPure(2, 3));
console.log(config);
console.log(nothing);


// Arrays

const scoresA = [80, 90, 100, 70];
const scoresB = [85, 95];

const allScores = [...scoresA, ...scoresB];
console.log(allScores);

const mutatingDemo = [...allScores];
mutatingDemo.push(55);
mutatingDemo.unshift(10);
mutatingDemo.pop();
mutatingDemo.shift();
mutatingDemo.splice(1, 1, 999);
mutatingDemo.sort((a,b) => a - b);
mutatingDemo.reverse();
mutatingDemo.fill(0, 0, 1);

const sliced = allScores.slice(1, 3);
const combined = scoresA.concat(scoresB);
const nested = [[1,2], [3, [4, 5]]];
const flatOnce = nested.flat();
const flatMapped = allScores.flatMap((n) => [n, n/2]);

const [first, second, ...restScores] = allScores;

for (let i=0; i < allScores.length; i++){
  console.log("for loop:", allScores[i]);
}
for(const score of allScores){
  console.log("for...of", score);
}
for(const index in allScores){
  console.log("for...in (index):", index);
}
allScores.forEach((score) => console.log("forEach:", score));

const passed = allScores.filter((score) => score >= 60);
const grades = passed.map((score) => (score >= 90 ? "A" : "B"));
const total = allScores.reduce((sum, score) => sum+score, 0);

const firstPerfect = allScores.find((s) => s === 100);
const firstPerfectIndex = allScores.findIndex((s) => s === 100);
const has45 = allScores.indexOf(45);
const includes60 = allScores.includes(60);
const anyFailed = allScores.some((s) => s < 60);
const allPassed = allScores.every((s) => s >= 60);

console.log({
  allScores, mutatingDemo, sliced, combined, flatOnce, flatMapped, 
  first, second, restScores, passed, grades, total,
  firstPerfect, firstPerfectIndex, has45, includes60, anyFailed, allPassed
});


// Objects

const name = "Hari";
const age = 25;

const basePerson = {
  name,
  age,
  ["role_" + "dev"]: "Frontend Developer",
  greet(){
    return `Hi I'm ${this.name}`;
  }
};

const contactInfo = { email: "hariexample@gmail.com", city: "Hyderabad"};

const fullPerson = {...basePerson, ...contactInfo, age : 26};

console.log(fullPerson.name);
console.log(fullPerson["email"]);

const { name : userName, age : userAge= 0, city} = fullPerson;
console.log(userName, userAge, city);

console.log(Object.keys(fullPerson));
console.log(Object.values(fullPerson));
console.log(Object.entries(fullPerson));

const merged = Object.assign({}, basePerson, contactInfo);
console.log(merged);

const frozenConfig = Object.freeze({ theme: "dark"});
frozenConfig.theme = "light";
console.log(frozenConfig.theme);


const animal = {
  makeSound(){
    return "some generic sound";
  }
};

const dog = Object.create(animal);
dog.bark = function (){
  return "Woof!";
};

console.log(dog.makeSound());
console.log(dog.bark());
console.log(Object.getPrototypeOf(dog) === animal);
console.log(dog.__proto__ === animal);

// DOM

// const form  = document.querySelector('#todoForm');
// const input = document.querySelector('#todoInput');
// const list  =  document.querySelector('#todoList');

// form.addEventListener('submit', event =>{
//   event.preventDefault();

//   const text = input.value.trim();

//   if(!text) return;

//   const li = document.createElement('li');

//   li.classList.add('todo-item');

//   li.dataset.id = crypto.randomUUID();

//   const span = document.createElement('span');

//   span.textContent = text;

//   const deleteButton = document.createElement('button');

//   deleteButton.textContent = 'Delete';

//   deleteButton.dataset.action = 'delete';

//   li.append(span, deleteButton);

//   list.append(li);

//   input.value = '';
// });

// list.addEventListener('click', event =>{
//   const button = event.target.closest('[data-action="delete"]');

//   if (!button) return;

//   const todo = button.closest('.todo-item');

//   if(!todo) return;

//   todo.remove();

// });


document.addEventListener('DOMContentLoaded', () => {
  const list = document.querySelector('#todo-list');
  const form = document.querySelector('#todo-form');
  const input1 = form.querySelector("input[name='task']");

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskText = input1.value.trim();

    if (!taskText) return;

    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.dataset.status = 'pending';
    li.setAttribute("title", "Click to toggle, double-click to delete");

    const label = document.createElement('span');
    label.textContent = taskText;

    li.appendChild(label);
    list.appendChild(li);

    input1.value = '';
  });

  list.addEventListener('click', (event) => {
    const item = event.target.closest('.todo-item');
    if (!item) return;

    item.classList.toggle("done");
    item.dataset.status = item.classList.contains("done") ? "done" : "pending";
  });

  list.addEventListener('dblclick', (event) => {
    event.stopPropagation();
    const item = event.target.closest('.todo-item');
    if (item) item.remove();
  });

  input1.addEventListener("input", (event) => {
    const charCount = event.target.value.length;
    document.querySelector("#charCount").textContent = `Character count: ${charCount}`;
  });

  input1.addEventListener("keydown", (event) => {
    if(event.key === "Escape") input1.value = '';
  });

  window.addEventListener("resize", () => {
    console.log("Window resized to:",  window.innerWidth);
  });

  window.addEventListener("scroll", () => {
    console.log("Window scrolled to:", window.scrollY);
  });

  window.addEventListener("load", () => {
    console.log("Window fully loaded");
  });
});

// Classes

class Animal {
  #energy;

  static kingdom = "Animalia";

  constructor(name, energy=100){
    this.name= name;
    this.#energy = energy;
  }

  get energy() {
    return this.#energy;
  }

  set energy(value) {
    this.#energy = value < 0 ? 0 : value;
  }

  makeSound(){
    return `${this.name} makes a generic sound`;
  }

  static describeKingdom(){
    return `All animals belong to ${Animal.kingdom}`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name, 120);
    this.breed = breed;
  }
  makeSound(){
    return `${this.name} barks: Woof`;
  }

  fetch() {
    this.energy -= 10;
    return `${super.makeSound()} ...then ${this.name} fetches the ball (energy: ${this.energy})`;
  }
}

const canSwim = {
  swin(){
    return `${this.name} paddles through the water`;
  }
};

function createDuck(name){
  return Object.assign({name}, canSwim, {
    quack(){
      return `${this.name} says quack!`;
    }
  });
}

const genericAnimal = new Animal("Creature");
const rex = new Dog("Rex", "Labrador");
const duck = createDuck("Donald");

console.log(genericAnimal.makeSound());
console.log(rex.makeSound());
console.log(rex.fetch());
console.log(rex.energy);
rex.energy = -50;
console.log(rex.energy);

console.log(Animal.describeKingdom());
console.log(Dog.kingdom);

console.log(duck.swin());
console.log(duck.quack());

console.log(rex instanceof Dog, rex instanceof Animal);

// Error Handling

// class ValidationError extends Error {
//  constructor(message, field) {
//  super(message);
//  this.name = "ValidationError";
//  this.field = field;
//  }
// }
// class NotFoundError extends Error {
//  constructor(message) {
//  super(message);
//  this.name = "NotFoundError";
//  }
// }
// function validateAge(age) {
//  if (typeof age !== "number") {
//  throw new TypeError("Age must be a number");
//  }
//  if (age < 0 || age > 150) {
//  throw new RangeError("Age must be between 0 and 150");
//  }
//  if (age < 18) {
//  throw new ValidationError("User must be an adult", "age");
//  }
//  return true;
// }
// function findUser(users, id) {
//  const user = users.find((u) => u.id === id);
//  if (!user) {
//  throw new NotFoundError(`User with id ${id} not found`);
//  }
//  return user;
// }
// function processUser(users, id, age) {
//  try {
//   const user = findUser(users, id);
//   validateAge(age);
//   console.log(`${user.name} is valid and processed`);
//   return { success: true, user };
//  } catch (error) {
//  if (error instanceof ValidationError) {
//   console.log(`Validation failed on field '${error.field}': ${error.message}`);
//  } else if (error instanceof NotFoundError) {
//   console.log(`Lookup failed: ${error.message}`);
//  } else if (error instanceof TypeError) {
//   console.log(`Type problem: ${error.message}`);
//  } else if (error instanceof RangeError) {
//   console.log(`Range problem: ${error.message}`);
//  } else {
//   console.log(`Unexpected error: ${error.message}`);
//  }
//  return { success: false, error };
//  } finally {
//  console.log(`Finished attempting to process user id ${id}`);
//  }
// }
// const users = [{ id: 1, name: "Hari" }];
// processUser(users, 1, 16);
// processUser(users, 99, 25);
// processUser(users, 1, "twenty");
// processUser(users, 1, 25);
// window.onerror = function (message, source, lineno, colno, error) {
//  console.log(`Global browser error caught: ${message} at ${lineno}:${colno}`);
// return true;
// };
// process.on("uncaughtException", (error) => {
//  console.log(`Global Node error caught: ${error.message}`);
//  process.exit(1);
// });


// Fetch API

async function createUser(){
  const user = {
    name: "Hari",
    age: 23
  };

  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  }
  );

  const data = await response.json();
  console.log("User created:", data);
}

createUser();

async function getProducts() {

    try {

        const response = await fetch(
            "https://api.example.com/products"
        );

        if (!response.ok) {
            throw new Error(
                `Request failed: ${response.status}`
            );
        }

        const products = await response.json();

        console.log(products);

    } catch (error) {

        console.error(error);
    }
}

getProducts();

async function createProduct() {

    const product = {
        name: "Laptop",
        price: 50000
    };

    try {

        const response = await fetch(
            "https://api.example.com/products",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(product)
            }
        );

        if (!response.ok) {
            throw new Error(
                `Request failed: ${response.status}`
            );
        }

        const createdProduct =
            await response.json();

        console.log(createdProduct);

    } catch (error) {

        console.error(error);
    }
}
createProduct();