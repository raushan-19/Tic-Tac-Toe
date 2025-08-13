let boxes = document.querySelectorAll(".box");   // Selects all elements with class "box" (Tic-Tac-Toe cells)
let resetBtn = document.querySelector("#reset-btn"); // Selects the reset button by its ID
let newGameBtn = document.querySelector("#new-btn"); // Selects the new game button by its ID
let msgContainer = document.querySelector(".msg-container"); // Selects the container where the message will be shown
let msg = document.querySelector("#msg"); // Selects the message text element by its ID

let turnO = true; // Boolean to track whose turn it is; true means Player O's turn, false means Player X's turn
let count = 0; // Counter to track number of moves (used to check for draw)

const winPatterns = [ // All possible winning combinations (indexes of the boxes array)
  [0, 1, 2], // Top row
  [0, 3, 6], // Left column
  [0, 4, 8], // Left diagonal
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [2, 4, 6], // Right diagonal
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
];

const resetGame = () => {       // Function to reset the game state
  turnO = true;                 // Reset turn to Player O
  count = 0;                    // Reset move count
  enableBoxes();                // Enable all boxes and clear text
  msgContainer.classList.add("hide"); // Hide the message container
};

boxes.forEach((box) => {        // Loop through each box (cell)
  box.addEventListener("click", () => { // Add click event listener to each box
    if (turnO) {                 // If it's Player O's turn
      box.innerText = "O";       // Place "O" in the clicked box
      turnO = false;             // Switch turn to Player X
    } else {                     // Else it's Player X's turn
      box.innerText = "X";       // Place "X" in the clicked box
      turnO = true;              // Switch turn to Player O
    }
    box.disabled = true;         // Disable the clicked box so it can't be clicked again
    count++;                     // Increase move count

    let isWinner = checkWinner(); // Check if the move resulted in a win

    if (count === 9 && !isWinner) { // If all 9 moves are done and no winner
      gameDraw();                   // Declare game as draw
    }
  });
});

const gameDraw = () => {         // Function to handle draw situation
  msg.innerText = `Game was a Draw.`; // Display draw message
  msgContainer.classList.remove("hide"); // Show the message container
  disableBoxes();                // Disable all boxes so game stops
};

const disableBoxes = () => {     // Function to disable all boxes
  for (let box of boxes) {       // Loop through each box
    box.disabled = true;         // Disable it
  }
};

const enableBoxes = () => {      // Function to enable all boxes
  for (let box of boxes) {       // Loop through each box
    box.disabled = false;        // Enable it
    box.innerText = "";          // Clear its text
  }
};

const showWinner = (winner) => { // Function to display the winner
  msg.innerText = `Congratulations, Winner is ${winner}`; // Set winner message
  msgContainer.classList.remove("hide"); // Show the message container
  disableBoxes();                // Disable further moves
};

const checkWinner = () => {      // Function to check for a winner
  for (let pattern of winPatterns) { // Loop through each winning pattern
    let pos1Val = boxes[pattern[0]].innerText; // Get text from first box in pattern
    let pos2Val = boxes[pattern[1]].innerText; // Get text from second box
    let pos3Val = boxes[pattern[2]].innerText; // Get text from third box

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") { // If none of them are empty
      if (pos1Val === pos2Val && pos2Val === pos3Val) {    // And all values match
        showWinner(pos1Val);       // Declare the matching value as winner
        return true;               // Return true meaning winner found
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame); // When new game button is clicked, reset the game
resetBtn.addEventListener("click", resetGame);   // When reset button is clicked, reset the game