let buttons = document.querySelectorAll(".buttons button");
let resetBtn = document.querySelector(".reset button");
let showWinner = document.querySelector(".winner h2");
let scoreO="0";
let scoreX="0";
let scoreCross = document.querySelector("#scoreX");
let scoreZero = document.querySelector("#score0");


let winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
let turnX = "true";
let turnO = "true";

//choose your choice //
Array.from(buttons).forEach((button) => {
  button.addEventListener("click", () => {
    if (button.innerText == "") {
      if (turnX == "true") {
        showWinner.innerText = `Turn O`

        button.innerText = "X";
        turnX = "false";
        turnO = "true";
      } else {
        showWinner.innerText = `Turn X`
        button.innerText = "O";
        turnO = "false";
        turnX = "true";
      }
    }
    checkWinner();
  });
});

// check the winner //
let checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (
      buttons[a].innerText &&
      buttons[a].innerText === buttons[b].innerText &&
      buttons[a].innerText === buttons[c].innerText
    ) {
      showWinner.innerText = `${buttons[a].innerText} wins!`
      disableBtn()
      gameScore()
      return;
    }
  }
};

// Reset Button //
resetBtn.addEventListener("click", () => {
  buttons.forEach((button) => {
    button.innerText = "";
  });
  showWinner.innerText = "";
  showWinner.innerText = "Play Your Move";
  turnX = "true";
  turn0 = "false";
});

// disable button afer getting winner//
let disableBtn = () => {
  // buttons.forEach(button => {
  //   button.disabled = 'true';

  // });
}


// Function for Score Update //
let gameScore = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (
      buttons[a].innerText && buttons[a].innerText == "X" &&
      buttons[a].innerText === buttons[b].innerText &&
      buttons[a].innerText === buttons[c].innerText
    ) {
      scoreX++;
      scoreCross.innerText = scoreX;
      console.log("x wins")
      break;
    } else if (buttons[a].innerText && buttons[a].innerText == "O" &&
      buttons[a].innerText === buttons[b].innerText &&
      buttons[a].innerText === buttons[c].innerText) {
      scoreO++;
      scoreZero.innerText = scoreO;
      console.log("O wins")
      break;
    }
  }
}
