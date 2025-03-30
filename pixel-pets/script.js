let selectedPet = "";
let hunger = 100;
let happiness = 100;
let energy = 100;

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

  // Set placeholder image
  const petImage = document.getElementById("pet-image");
  petImage.innerText = petEmojiMap[pet] || "❓";

  // Show game screen
  document.getElementById("pet-selection").style.display = "none";
  document.getElementById("game").style.display = "block";

  updateStats();
}

function updateStats() {
  document.getElementById("hunger").innerText = hunger;
  document.getElementById("happiness").innerText = happiness;
  document.getElementById("energy").innerText = energy;
}

function feedPet() {
  hunger = Math.min(hunger + 10, 100);
  updateStats();
}

function playWithPet() {
  happiness = Math.min(happiness + 10, 100);
  energy = Math.max(energy - 10, 0);
  updateStats();
}

function restPet() {
  energy = Math.min(energy + 10, 100);
  hunger = Math.max(hunger - 5, 0);
  updateStats();
}
