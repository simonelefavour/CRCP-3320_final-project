let selectedPet = "";
let hunger = 100;
let happiness = 100;
let energy = 100;

let petX = 100;
let petY = 50;
const moveAmount = 10;

// Challenge system
let challengeType = "";
let challengeGoal = 0;
let challengeProgress = 0;

const petEmojiMap = {
  dog: "🐶",
  cat: "🐱",
  bunny: "🐰",
  snake: "🐍",
  chameleon: "🦎",
  dragon: "🐉"
};

function selectPet(pet) {
  selectedPet = pet;
  document.getElementById("pet-image").innerText = petEmojiMap[pet] || "❓";
  document.getElementById("pet-selection").style.display = "none";
  document.getElementById("game").style.display = "block";

  generateChallenge();
  updateStats();
}

function updateStats() {
  document.getElementById("hunger").innerText = hunger;
  document.getElementById("happiness").innerText = happiness;
  document.getElementById("energy").innerText = energy;
}

function feedPet() {
  hunger = Math.min(hunger + 10, 100);
  checkChallenge("feed");
  updateStats();
}

function playWithPet() {
  happiness = Math.min(happiness + 10, 100);
  energy = Math.max(energy - 10, 0);
  checkChallenge("play");
  updateStats();
}

function restPet() {
  energy = Math.min(energy + 10, 100);
  hunger = Math.max(hunger - 5, 0);
  checkChallenge("rest");
  updateStats();
}

// Movement
document.addEventListener("keydown", function (event) {
  const key = event.key.toLowerCase();
  switch (key) {
    case "w":
      petY = Math.max(0, petY - moveAmount);
      break;
    case "s":
      petY = Math.min(150, petY + moveAmount);
      break;
    case "a":
      petX = Math.max(0, petX - moveAmount);
      break;
    case "d":
      petX = Math.min(300, petX + moveAmount);
      break;
  }

  const pet = document.getElementById("pet-image");
  pet.style.left = petX + "px";
  pet.style.top = petY + "px";
});

// Challenge logic
function generateChallenge() {
  const types = ["feed", "play", "rest"];
  challengeType = types[Math.floor(Math.random() * types.length)];
  challengeGoal = Math.floor(Math.random() * 3) + 2; // 2 to 4 times
  challengeProgress = 0;

  document.getElementById("challenge-text").innerText = `Do '${challengeType}' ${challengeGoal} times`;
  document.getElementById("challenge-goal").innerText = challengeGoal;
  document.getElementById("challenge-progress").innerText = challengeProgress;
  document.getElementById("challenge-complete").innerText = "";
}

function checkChallenge(action) {
  if (action === challengeType && challengeProgress < challengeGoal) {
    challengeProgress++;
    document.getElementById("challenge-progress").innerText = challengeProgress;

    if (challengeProgress === challengeGoal) {
      document.getElementById("challenge-complete").innerText = "🎉 Challenge Completed! Your pet is proud of you!";
    }
  }
}
