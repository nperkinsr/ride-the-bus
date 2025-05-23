// Get the card stack element from the HTML
const cardStack = document.getElementById("cardStack");

// Variables to keep track of the game state
let shuffling = false;
let cardStageOne = null;
let cardStageTwo = null;
let cardStageThree = null;
let cardStageFour = null;

// Arrays for each suit of cards
const hearts = [];
const diamonds = [];
const spades = [];
const clubs = [];

// Fill each suit array with card objects
for (let value = 1; value <= 13; value++) {
  hearts.push({
    value: value,
    suit: "hearts",
    colour: "red",
    image: `cards/${value}_hearts.png`,
  });

  diamonds.push({
    value: value,
    suit: "diamonds",
    colour: "red",
    image: `cards/${value}_diamonds.png`,
  });

  spades.push({
    value: value,
    suit: "spades",
    colour: "black",
    image: `cards/${value}_spades.png`,
  });

  clubs.push({
    value: value,
    suit: "clubs",
    colour: "black",
    image: `cards/${value}_clubs.png`,
  });
}

// Combine all suits into one deck array
const deck = [...hearts, ...diamonds, ...spades, ...clubs];

/////////////////////////////
///////  GAME STAGES  ///////
/////////////////////////////

/////// STAGE ONE ///////

// This function starts the first stage of the game
function startStageOne() {
  // Show the back of a card in the red/black stage area
  const stage = document.querySelector(".stage-redblack");
  stage.innerHTML = `<img src="./assets/back.png" style="opacity:0; height:200px; width:auto;">`;
  const img = stage.querySelector("img");
  setTimeout(function () {
    img.style.transition = "opacity 1s";
    img.style.opacity = 1;
  }, 50);

  // Show the modal for stage one after 1 second
  setTimeout(function () {
    document.querySelector(".modal-one").classList.remove("hidden");
  }, 1000);

  // Pick a random card for stage one
  cardStageOne = deck[Math.floor(Math.random() * deck.length)];
}

/////// STAGE TWO ///////

// This function starts the second stage of the game
function startStageTwo() {
  // Hide the modal for stage one
  document.querySelector(".modal-one").classList.add("hidden");

  // Show the back of a card in the high/low stage area
  const stage = document.querySelector(".stage-highlow");
  stage.innerHTML = `<img src="./assets/back.png" style="opacity:0; height:200px; width:auto;">`;
  const img = stage.querySelector("img");
  setTimeout(function () {
    img.style.transition = "opacity 1s";
    img.style.opacity = 1;
  }, 50);

  // Show the modal for stage two after 1 second
  setTimeout(function () {
    document.querySelector(".modal-two").classList.remove("hidden");
  }, 1000);

  // Pick a random card for stage two
  cardStageTwo = deck[Math.floor(Math.random() * deck.length)];
}

/////// STAGE THREE ///////

// This function starts the third stage of the game
function startStageThree() {
  // Hide the modal for stage two
  document.querySelector(".modal-two").classList.add("hidden");

  // Show the back of a card in the in/out stage area
  const stage = document.querySelector(".stage-inout");
  stage.innerHTML = `<img src="./assets/back.png" style="opacity:0; height:200px; width:auto;">`;
  const img = stage.querySelector("img");
  setTimeout(function () {
    img.style.transition = "opacity 1s";
    img.style.opacity = 1;
  }, 50);

  // Show the modal for stage three after 1 second
  setTimeout(function () {
    document.querySelector(".modal-three").classList.remove("hidden");
  }, 1000);

  // Pick a random card for stage three
  cardStageThree = deck[Math.floor(Math.random() * deck.length)];
}

/////// STAGE FOUR ///////

// This function starts the fourth and final stage of the game
function startStageFour() {
  // Hide the modal for stage three
  document.querySelector(".modal-three").classList.add("hidden");

  // Pick a random card for stage four
  cardStageFour = deck[Math.floor(Math.random() * deck.length)];

  // Show the back of a card in the suit stage area
  const stage = document.querySelector(".stage-suit");
  stage.innerHTML = `<img src="./assets/back.png" style="opacity:0; height:200px; width:auto;">`;
  const img = stage.querySelector("img");
  setTimeout(function () {
    img.style.transition = "opacity 1s";
    img.style.opacity = 1;
  }, 50);

  // Show the modal for stage four after 1 second
  setTimeout(function () {
    document.querySelector(".modal-four").classList.remove("hidden");
  }, 1000);
}

///////////////////////
/////// SHUFFLE ///////
///////////////////////

// This function animates the shuffling of the card stack
function shuffleStack() {
  if (shuffling) return; // Prevent shuffling if already shuffling
  shuffling = true;

  // Play shuffle sound
  const shuffleSound = new Audio("./assets/shuffle.wav");
  shuffleSound.play();

  let direction = "left";
  let count = 0;
  const shuffleDuration = 800; // How long the shuffle lasts
  const intervalTime = 100; // Time between each card animation
  const startTime = Date.now();

  // Animate cards moving left and right
  const interval = setInterval(function () {
    const now = Date.now();
    if (now - startTime >= shuffleDuration) {
      clearInterval(interval);

      setTimeout(function () {
        // Remove extra cards from the stack
        while (cardStack.children.length > 1) {
          cardStack.removeChild(cardStack.lastChild);
        }
        shuffling = false;
        startStageOne(); // Start the game after shuffling
      }, 200);

      return;
    }

    // Create a new card back and animate it
    const newCard = document.createElement("div");
    newCard.classList.add("cardBack");
    newCard.style.zIndex = count + 2;
    newCard.style.left = "50%";
    newCard.style.transform =
      direction === "left" ? "translateX(-250%)" : "translateX(50%)";
    cardStack.appendChild(newCard);

    requestAnimationFrame(function () {
      newCard.style.transition = "transform 0.1s ease";
      newCard.style.transform = "translateX(-50%)";
    });

    direction = direction === "left" ? "right" : "left";
    count++;
  }, intervalTime);
}

// Listen for clicks on the card stack to start shuffling
cardStack.addEventListener("click", shuffleStack);

/////////////////////////////
/////// SOUND HELPERS ///////
/////////////////////////////

/////// MODAL SOUND ///////

// Play the success sound
function playSuccessSound() {
  const audio = new Audio("./assets/goodJob.wav");
  audio.play();
}

// Play the game over sound
function playGameOverSound() {
  const audio = new Audio("./assets/gameFail.wav");
  audio.play();
}

/////// BUTTON CLICK SOUND ///////
// Play the button click sound
function playButtonClickSound() {
  const audio = new Audio("./assets/buttonClick.mp3");
  audio.play();
}

/////// Show Success Modal with Sound ///////
// Show the success modal and play the sound
function showSuccessModal() {
  document.querySelector(".modal-four").classList.add("hidden");
  document.querySelector(".success-modal").classList.remove("hidden");
  document.querySelector(".modal-backdrop").classList.remove("hidden");
  playSuccessSound();
}

/////// Show Game Over Modal with Sound ///////
// Show the game over modal and play the sound
function showGameOverModal(currentModal) {
  document.querySelector(currentModal).classList.add("hidden");
  document.querySelector(".game-over-modal").classList.remove("hidden");
  document.querySelector(".modal-backdrop").classList.remove("hidden");
  playGameOverSound();
}

/////////////////////////////
/////// MODAL CHOICES ///////
/////////////////////////////

/////// MODAL ONE HANDLER ///////
// Handle clicks on the red/black buttons in stage one
document.querySelector(".modal-one").addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    playButtonClickSound();
    const guess = e.target.getAttribute("data-value");
    const stage = document.querySelector(".stage-redblack");
    // Reveal the card
    stage.innerHTML = `<img src="${cardStageOne.image}" style="height:200px; width:auto;">`;

    setTimeout(function () {
      if (guess === cardStageOne.colour) {
        startStageTwo();
      } else {
        showGameOverModal(".modal-one");
      }
    }, 1000);
  }
});

/////// MODAL TWO HANDLER ///////
// Handle clicks on the high/low buttons in stage two
document.querySelector(".modal-two").addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    playButtonClickSound();
    const guess = e.target.getAttribute("data-value");
    const stage = document.querySelector(".stage-highlow");
    // Reveal the card
    stage.innerHTML = `<img src="${cardStageTwo.image}" style="height:200px; width:auto;">`;

    setTimeout(function () {
      let correct = false;
      if (guess === "higher" && cardStageTwo.value > cardStageOne.value) {
        correct = true;
      }
      if (guess === "lower" && cardStageTwo.value < cardStageOne.value) {
        correct = true;
      }
      if (correct) {
        startStageThree();
      } else {
        showGameOverModal(".modal-two");
      }
    }, 1000);
  }
});

/////// MODAL THREE HANDLER ///////
// Handle clicks on the inside/outside buttons in stage three
document.querySelector(".modal-three").addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    playButtonClickSound();
    const guess = e.target.getAttribute("data-value");
    const stage = document.querySelector(".stage-inout");
    // Reveal the card
    stage.innerHTML = `<img src="${cardStageThree.image}" style="height:200px; width:auto;">`;

    // Calculate the range between the first two cards
    const min = Math.min(cardStageOne.value, cardStageTwo.value);
    const max = Math.max(cardStageOne.value, cardStageTwo.value);

    setTimeout(function () {
      let isInside = cardStageThree.value >= min && cardStageThree.value <= max;
      let correct = false;
      if (guess === "inside" && isInside) correct = true;
      if (guess === "outside" && !isInside) correct = true;

      if (correct) {
        startStageFour();
      } else {
        showGameOverModal(".modal-three");
      }
    }, 1000);
  }
});

/////// MODAL FOUR HANDLER ///////
// Handle clicks on the suit selection buttons in stage four
document.querySelector(".modal-four").addEventListener("click", function (e) {
  // Get the button that was clicked, even if the icon inside was clicked
  const btn = e.target.closest("button");
  // Only handle clicks on the suit buttons
  if (btn && btn.parentElement.classList.contains("button-group")) {
    playButtonClickSound();
    const guess = btn.getAttribute("data-value");
    const stage = document.querySelector(".stage-suit");
    // Reveal the card
    stage.innerHTML = `<img src="${cardStageFour.image}" style="height:200px; width:auto;">`;

    // Check if the guess matches the card's suit
    if (guess === cardStageFour.suit) {
      showSuccessModal();
    } else {
      showGameOverModal(".modal-four");
    }
  }
});

/////// PLAY AGAIN HANDLER ///////
// Handle clicks on the play again buttons in the success and game over modals
document.querySelectorAll('[data-value="playAgain"]').forEach(function (btn) {
  btn.addEventListener("click", function () {
    playButtonClickSound();
    // Hide all modals
    document.querySelector(".success-modal").classList.add("hidden");
    document.querySelector(".game-over-modal").classList.add("hidden");
    document.querySelector(".modal-one").classList.add("hidden");
    document.querySelector(".modal-two").classList.add("hidden");
    document.querySelector(".modal-three").classList.add("hidden");
    document.querySelector(".modal-four").classList.add("hidden");

    // Reset all stage areas
    document.querySelector(".stage-redblack").innerHTML = "";
    document.querySelector(".stage-highlow").innerHTML = "";
    document.querySelector(".stage-inout").innerHTML = "";
    document.querySelector(".stage-suit").innerHTML = "";

    // Reset card variables
    cardStageOne = null;
    cardStageTwo = null;
    cardStageThree = null;
    cardStageFour = null;

    // Re-enable modal-four buttons for next game
    document.querySelectorAll(".modal-four button").forEach(function (btn) {
      btn.disabled = false;
    });

    // Hide the modal backdrop
    document.querySelector(".modal-backdrop").classList.add("hidden");
  });
});

/////// Show modal sounds when displayed ///////
// This code will play the correct sound when the success or game over modal is shown
const successModal = document.querySelector(".success-modal");
const gameOverModal = document.querySelector(".game-over-modal");

const observer = new MutationObserver(function () {
  if (!successModal.classList.contains("hidden")) playSuccessSound();
  if (!gameOverModal.classList.contains("hidden")) playGameOverSound();
});
observer.observe(successModal, {
  attributes: true,
  attributeFilter: ["class"],
});
observer.observe(gameOverModal, {
  attributes: true,
  attributeFilter: ["class"],
});
