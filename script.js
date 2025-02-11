const gifs = [
  "images/1.gif",
  "images/2.gif",
  "images/3.gif",
  "images/4.gif",
  "images/5.gif",
  "images/6.gif",
];

const questions = [
  "Are you sure? 😢",
  "Wait! You must be joking... 😳",
  "Don't break my heart 💔",
  "I'll cry if you say no again... 😭",
  "I'll tell your mom! 😤",
  "Come on, say yes! 😣",
];

let index = 0;
let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let gifImage = document.getElementById("gif");

// Initial button size
let yesSize = 20;
let yesPadding = 10;

// Track when the "No" button should start running away
let noButtonEscape = false;

noButton.addEventListener("click", function () {
  if (index < questions.length - 1) {
    index++;
    questionText.innerText = questions[index];
    gifImage.src = gifs[index];

    // Increase "Yes" button size
    yesSize += 50;
    yesPadding += 5;
    yesButton.style.fontSize = yesSize + "px";
    yesButton.style.padding = yesPadding + "px";
  } else {
    yesSize += 30; // Final increase
    yesPadding += 5;
    yesButton.style.fontSize = yesSize + "px";
    yesButton.style.padding = yesPadding + "px";
  }

  // After 5 "No" clicks, activate escape mode
  if (index >= 5) {
    noButtonEscape = true;
  }
});

// Make "No" button move randomly when hovered
noButton.addEventListener("mouseover", function () {
  if (index >= 5) {
    let x = Math.random() * window.innerWidth * 0.6 - window.innerWidth * 0.3;
    let y = Math.random() * window.innerHeight * 0.6 - window.innerHeight * 0.3;
    noButton.style.position = "absolute";
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
  }
});

// Make "No" button move when trying to click after 5 times
noButton.addEventListener("mousemove", function () {
  if (noButtonEscape) {
    let x = Math.random() * window.innerWidth * 0.8;
    let y = Math.random() * window.innerHeight * 0.8;
    noButton.style.position = "absolute";
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
  }
});

// When "Yes" is clicked
yesButton.addEventListener("click", function () {
  questionText.innerText = "Yay! I knew it! 😍";
  gifImage.src = "images/last.gif";
  yesButton.style.display = "none";
  noButton.style.display = "none";
});


noButton.addEventListener("touchmove", moveNoButton); // Added for mobile

function moveNoButton(event) {
  if (noButtonEscape) {
    let x = Math.random() * window.innerWidth * 0.8;
    let y = Math.random() * window.innerHeight * 0.8;

    noButton.style.position = "absolute";
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;

    event.preventDefault(); // Prevents accidental scrolling
  }
}

let music = new Audio("audio/Ahista.mp3");
music.loop = true; // Keep looping

let muteBtn = document.getElementById("mute-btn");

// Try to autoplay when the page loads
window.addEventListener("load", function () {
  music.play().catch(() => {
    console.log("Autoplay blocked, waiting for user action.");
  });
});

// Start music when any button is clicked (for mobile)
document.addEventListener(
  "click",
  function () {
    music.play();
  },
  { once: true }
);

// Toggle music on mute button click
muteBtn.addEventListener("click", function () {
  if (music.paused) {
    music.play();
    muteBtn.innerText = "🔊"; // Change icon to unmute
  } else {
    music.pause();
    muteBtn.innerText = "🔇"; // Change icon to mute
  }
});
