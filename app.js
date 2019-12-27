/**
 * GAME FUNCTION:
 * Player must guess num between min and max
 * Player gets certain amount of guesses
 * Notify player of remaining guesses
 * Let player chose to play again
 */

// Game Values
let min = 2,
  max = 11,
  winningNum = getWinningNum(min, max),
  guessesLeft = 3;

let hintText = "";

// UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

let hint = document.querySelector("#hint");

// Assign UI min max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener("mouseup", function(e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
  if (e.target.className === "hint") {
    alert(`foo: ${hintText}`);
  }
});

//Listen for guess
guessBtn.addEventListener("click", function() {
  let guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < min || guess > max) {
    // message.textContent = "Invalid guess try again";
    setMessage(`Please enter number between ${min} and ${max}`, "red");
    return;
  }

  if (guess === winningNum) {
    // RIGHT number - Game Over!

    gameOver(true, `YOU WIN! ${guess} is correct`);
  } else {
    //WRONG number
    guessesLeft--;

    if (guessesLeft === 0) {
      // Game Over!
      gameOver(
        false,
        `Game Over! Correct number was ${winningNum}. Play again?`
      );
    } else {
      // Game continues
      guessInput.value = "";
      setMessageNotOverWithHint(`Try again, you have ${guessesLeft} tries`, guess);
      //   setMessage(`Try again, you have ${guessesLeft} tries`);
    }
  }
});

function getWinningNum(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
  // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
}

function gameOver(won, msg) {
  guessInput.disabled = true;
  let color = won ? "green" : "red";
  guessInput.style.borderColor = color;
  setMessage(msg, color);
  guessBtn.className = "play-again";
  guessBtn.value = "Play Again";
}

function setMessage(msg, color = "black") {
  message.style.color = color;
  message.textContent = msg;
}

function setMessageNotOverWithHint(msg, guess) {
  if (guess > winningNum) {
    hintText = "You are too high";
  } else {
    hintText = "You are too low";
  }
  message.style.color = "black";
  message.innerHTML = `<div>${msg}</div><button class='hint'>Hint</button>`;
  hint = document.querySelector(".hint");
}
