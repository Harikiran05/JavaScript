

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