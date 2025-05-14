let selectedPet = "";
let hunger = 100;
let happiness = 100;
let energy = 100;

let petX = 100;
let petY = 100;
const moveAmount = 10;

let item = null;
let itemType = "";

let poopActive = false;
let balloonActive = false;
let friendActive = false;

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
  document.getElementById("pet-image").innerText = petEmojiMap[pet];
  document.getElementById("pet-selection").style.display = "none";
  document.getElementById("game").style.display = "block";
  placePet();
  generateChallenge();
  setInterval(statDecay, 3000);
  setInterval(spawnBalloon, 10000);
  setInterval(spawnFriend, 15000);
}

function placePet() {
  const pet = document.getElementById("pet-image");
  pet.style.left = petX + "px";
  pet.style.top = petY + "px";
}

function statDecay() {
  hunger = Math.max(0, hunger - 5);
  happiness = Math.max(0, happiness - 4);
  energy = Math.max(0, energy - 3);
  updateStats();
  checkNeeds();

  if (hunger > 90 && !poopActive) spawnPoop();
}

function updateStats() {
  document.getElementById("hunger").innerText = hunger;
  document.getElementById("happiness").innerText = happiness;
  document.getElementById("energy").innerText = energy;
}

function checkNeeds() {
  if (!item) {
    if (hunger <= 60) spawnItem("treat", "🍗");
    else if (happiness <= 60) spawnItem("toy", "🎾");
    else if (energy <= 60) spawnItem("bed", "🛏️");
  }
}

function spawnItem(type, emoji) {
  const itemEl = document.getElementById("item");
  itemType = type;
  item = {
    x: Math.floor(Math.random() * 300) + 30,
    y: Math.floor(Math.random() * 150) + 30,
  };
  itemEl.innerText = emoji;
  itemEl.style.left = item.x + "px";
  itemEl.style.top = item.y + "px";
}

document.addEventListener("keydown", (e) => {
  switch (e.key.toLowerCase()) {
    case "w": petY = Math.max(0, petY - moveAmount); break;
    case "s": petY = Math.min(200, petY + moveAmount); break;
    case "a": petX = Math.max(0, petX - moveAmount); break;
    case "d": petX = Math.min(350, petX + moveAmount); break;
  }
  placePet();
  checkCollision();
  checkBathZone();
});

function checkCollision() {
  if (item && isNear(petX, petY, item.x, item.y)) {
    if (itemType === "treat") hunger = Math.min(100, hunger + 20);
    if (itemType === "toy") happiness = Math.min(100, happiness + 20);
    if (itemType === "bed") energy = Math.min(100, energy + 20);
    checkChallenge(itemType);
    updateStats();
    clearItem();
  }

  if (poopActive && isNear(petX, petY, 200, 100)) {
    poopActive = false;
    document.getElementById("poop").innerText = "";
    happiness = Math.min(100, happiness + 5);
    updateStats();
  }

  if (balloonActive && isNear(petX, petY, 250, 60)) {
    balloonActive = false;
    document.getElementById("balloon").innerText = "";
    happiness = Math.min(100, happiness + 10);
    updateStats();
  }

  if (friendActive && isNear(petX, petY, 300, 120)) {
    friendActive = false;
    document.getElementById("friend").innerText = "";
    hunger = Math.min(100, hunger + 5);
    happiness = Math.min(100, happiness + 5);
    energy = Math.min(100, energy + 5);
    updateStats();
  }
}

function isNear(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) < 40 && Math.abs(y1 - y2) < 40;
}

function clearItem() {
  document.getElementById("item").innerText = "";
  item = null;
  itemType = "";
}

function checkBathZone() {
  // Bath is always at (left: 5px, bottom: 5px) → approx (5, 205)
  if (petX < 50 && petY > 180) {
    happiness = Math.min(100, happiness + 1);
    updateStats();
  }
}

function spawnPoop() {
  poopActive = true;
  const poop = document.getElementById("poop");
  poop.innerText = "💩";
  poop.style.left = "200px";
  poop.style.top = "100px";
}

function spawnBalloon() {
  if (balloonActive) return;
  balloonActive = true;
  const balloon = document.getElementById("balloon");
  balloon.innerText = "🎈";
  balloon.style.left = "250px";
  balloon.style.top = "60px";
}

function spawnFriend() {
  if (friendActive) return;
  friendActive = true;
  const friend = document.getElementById("friend");
  friend.innerText = "🐶";
  friend.style.left = "300px";
  friend.style.top = "120px";
}

function generateChallenge() {
  const options = ["treat", "toy", "bed"];
  challengeType = options[Math.floor(Math.random() * options.length)];
  challengeGoal = Math.floor(Math.random() * 3) + 2;
  challengeProgress = 0;
  document.getElementById("challenge-text").innerText = `Collect ${challengeGoal} ${challengeType === "treat" ? "treats" : challengeType === "toy" ? "toys" : "naps"}`;
  document.getElementById("challenge-progress").innerText = challengeProgress;
  document.getElementById("challenge-goal").innerText = challengeGoal;
  document.getElementById("challenge-complete").innerText = "";
}

function checkChallenge(type) {
  if (type === challengeType && challengeProgress < challengeGoal) {
    challengeProgress++;
    document.getElementById("challenge-progress").innerText = challengeProgress;
    if (challengeProgress === challengeGoal) {
      document.getElementById("challenge-complete").innerText = "🏆 Challenge Complete!";
    }
  }
}
