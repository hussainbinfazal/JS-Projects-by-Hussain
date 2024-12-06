let msgW = document.querySelector(".showwinner p");
const images = document.querySelectorAll(".images div");
let playerScoreDisplay = document.getElementById("point1");
let compScoreDisplay = document.getElementById("point2");
let winnerDisplay = document.querySelector(".showwinner");
let resetBtn = document.querySelector(".resetbtn button");
let playerScore = "0";
let compScore = "0";

Array.from(images).forEach((image) => {
  image.addEventListener("click", () => {
    let userChoice = image.getAttribute("id"); //UserChoice//
    playGame(userChoice);
  });
});

// Reset Game //
resetBtn.addEventListener("click", () => {
  playerScore = "0";
  compScore = "0";
  playerScoreDisplay.innerText = playerScore;
  compScoreDisplay.innerText = compScore; ///#c1dbb3
  winnerDisplay.style.backgroundColor = "#c1dbb3";
  msgW.style.color = "black";
  msgW.innerText = "Play Your Move";
});

// play game //
let playGame = (userChoice) => {
  // comp choice //
  const x = Math.floor(Math.random() * 3);
  compChoice = images[x].getAttribute("id");

  if (userChoice === compChoice) {
    drawGame();
  } else {
    checkWinner(userChoice, compChoice);
  }
};

// Draw Game Function //
let drawGame = () => {
  msgW.innerText = "Game was Draw";
  msgW.style.color = "#fdf0d5"; //ffd500
  winnerDisplay.style.backgroundColor = "#b5179e";
};

// check Winner //
let checkWinner = (userChoice, compChoice) => {
  let userWin = true;
  if (userChoice == "rock") {
    userWin = compChoice == "paper" ? false : true;
    // paper scissor//
  } else if (userChoice == "paper") {
    userWin = compChoice == "rock" ? true : false;
    //rock scissor//
  } else if (userChoice == "scissor") {
    userWin = compChoice == "rock" ? false : true;
    //rock paper//
  }
  showWinner(userWin, userChoice, compChoice);
};

//Show Winner Function //
let showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    playerScore++;
    playerScoreDisplay.innerText = playerScore;
    msgW.innerText = `You Won,Your Choice was ${userChoice} & CompChoice was ${compChoice}`;
    msgW.style.color = "#f8f7ff";
    winnerDisplay.style.backgroundColor = "#023e8a";
  } else {
    compScore++;
    compScoreDisplay.innerText = compScore;
    msgW.innerText = `"Comp Won,Comp Choice was ${compChoice} & User Choice was ${userChoice}`;
    msgW.style.color = "#ade8f4";
    winnerDisplay.style.backgroundColor = "#c1121f";
  }
};

//  //  // // // // //
