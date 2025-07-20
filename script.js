const quotes = [
  "Practice makes perfect.",
  "Typing is a fundamental skill.",
  "Code every day to improve.",
  "Consistency beats motivation.",
  "Errors help us learn."
];

const quoteDisplay = document.getElementById("quote");
const inputArea = document.getElementById("inputArea");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const restartBtn = document.getElementById("restartBtn");

let timer = 0;
let interval = null;
let isRunning = false;
let currentQuote = "";
let correctChars = 0;

function loadQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  currentQuote = quotes[randomIndex];
  quoteDisplay.textContent = currentQuote;
  inputArea.value = "";
  correctChars = 0;
  resetStats();
}

function resetStats() {
  clearInterval(interval);
  timer = 0;
  isRunning = false;
  timerDisplay.textContent = "0s";
  wpmDisplay.textContent = "0";
  accuracyDisplay.textContent = "0%";
}

function startTimer() {
  interval = setInterval(() => {
    timer++;
    timerDisplay.textContent = `${timer}s`;
    updateStats();
  }, 1000);
}

function updateStats() {
  const wordsTyped = inputArea.value.trim().split(/\s+/).length;
  const wpm = Math.round((wordsTyped / timer) * 60);
  wpmDisplay.textContent = isNaN(wpm) ? 0 : wpm;

  const totalTyped = inputArea.value.length;
  const accuracy = totalTyped === 0 ? 0 : Math.round((correctChars / totalTyped) * 100);
  accuracyDisplay.textContent = `${accuracy}%`;
}

inputArea.addEventListener("input", () => {
  if (!isRunning) {
    isRunning = true;
    startTimer();
  }

  const typed = inputArea.value;
  correctChars = 0;

  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === currentQuote[i]) {
      correctChars++;
    }
  }

  updateStats();
});

restartBtn.addEventListener("click", () => {
  loadQuote();
});

window.onload = loadQuote;
