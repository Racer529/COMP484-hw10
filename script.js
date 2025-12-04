$(function() {
  checkAndUpdatePetInfoInHtml();

  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.sleep-button').click(clickedSleepButton);
});

var pet_info = {
  name: "Ignikit",
  weight: 10,
  happiness: 5,
  energy: 100
};

function updateAll() {
  updateStats();
  updateUI();
}

function updateStats() {
  pet_info.mood = pet_info.happiness >= 5 ? "cheery" : "meh";
}

function updateUI() {
  updatePetInfoInHtml();
}

function clickedTreatButton() {
  pet_info.happiness++;
  pet_info.weight++;
  pet_info.energy = Math.max(0, pet_info.energy - 10);
  updateAll();
  logPet("After Treat");
  notify("Yum!!!");
  animatePet("treat");
}

function clickedPlayButton() {
  pet_info.happiness++;
  debugger; // Pause for DevTools demo
  pet_info.weight = Math.max(0, pet_info.weight - 1);
  pet_info.energy = Math.max(0, pet_info.energy - 20);
  updateAll();
  logPet("After Play");
  notify("That was fun!!!");
  animatePet("play");
}

function clickedExerciseButton() {
  // FIXED: corrected typo
  pet_info.happiness = Math.max(0, pet_info.happiness - 1);

  pet_info.weight = Math.max(0, pet_info.weight - 1);
  pet_info.energy = Math.max(0, pet_info.energy - 30);
  updateAll();
  logPet("After Exercise");
  notify("Phew!");
  animatePet("exercise");
}

function clickedSleepButton() {
  pet_info.happiness += 2;
  pet_info.energy = Math.min(100, pet_info.energy + 50);
  updateAll();
  logPet("After Sleep");
  notify("ZZZ");
  animatePet("sleep");
}

function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}

function checkWeightAndHappinessBeforeUpdating() {
  if (pet_info.weight < 0) pet_info.weight = 0;
  if (pet_info.happiness < 0) pet_info.happiness = 0;
  if (pet_info.energy < 0) pet_info.energy = 0;
  if (pet_info.energy > 100) pet_info.energy = 100;
}

function updatePetInfoInHtml() {
  $('.name').text(pet_info['name']);
  $('.weight').text(pet_info['weight']);
  $('.happiness').text(pet_info['happiness']);
  $('.energy').text(pet_info['energy']);
}

function notify(message) {
  $(".notification").text(message).fadeToggle(200).fadeToggle(200);
}

function animatePet(action) {
  if (action === "treat") {
    $(".pet-image").animate({ top: "-20px" }, 300)
                   .animate({ top: "0px" }, 300);
  } else if (action === "play") {
    $(".pet-image").animate({ left: "-20px" }, 200)
                   .animate({ left: "20px" }, 200)
                   .animate({ left: "0px" }, 200);
  } else if (action === "exercise") {
    $(".pet-image").animate({ width: "200px" }, 300)
                   .animate({ width: "250px" }, 300);
  } else if (action === "sleep") {
    $(".pet-image").animate({ opacity: 0.5 }, 500)
                   .animate({ opacity: 1 }, 500);
  }
}

function logPet(label) {
  console.group(label);
  console.table(pet_info);
  console.groupEnd();
}