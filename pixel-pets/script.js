let selectedPet = "";
let hunger = 100;
let happiness = 100;
let energy = 100;

// Starting position of the pet
let petX = 100;
let petY = 50;
const moveAmount = 10;

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

  const petImage = document.getElementById("pet-image");
  petImage.innerText = petEmojiMap[pet] || "❓";

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

// Movement controls
document.addEventListener("keydown", function (event) {
  switch (event.key.toLowerCase()) {
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
