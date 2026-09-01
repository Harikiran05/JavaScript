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
console.log(dog,__proto__ === animal);