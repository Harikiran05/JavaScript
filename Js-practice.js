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