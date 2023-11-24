const gameboard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");

let startCell = ["", "", "", "", "", "", "", "", ""];

let go = "circle";
let isDraw = false;
let counter = 0;
infoDisplay.textContent = "Circle goes first";
startCell.forEach((_cell, index) => {
  const cellElement = document.createElement("div");
  cellElement.classList.add("square");
  cellElement.id = index;
  cellElement.addEventListener("click", addGo);
  gameboard.append(cellElement);
});

function addGo(event) {
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  event.target.append(goDisplay);
  go = go === "circle" ? "cross" : "circle";
  infoDisplay.textContent = go + "'s turn now";
  event.target.removeEventListener("click", addGo);
  checkScore();
}

function checkScore() {
    
    counter++;
  const allSquares = document.querySelectorAll(".square");  
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  
  winningCombos.forEach(array=>{
    const circleWins = array.every(cell=>
        allSquares[cell].firstChild?.classList.contains('circle')
       
    );

    if(circleWins){
        infoDisplay.textContent = "Circle Wins!!";
        allSquares.forEach(square=> square.replaceWith(square.cloneNode(true)));
        counter = 0;
        return;
    }else if(counter == 9 && !circleWins){
        infoDisplay.textContent = "Draw!!";
    }
  })

  winningCombos.forEach(array=>{
    const crossWins = array.every(cell=>
        allSquares[cell].firstChild?.classList.contains('cross')
    );

    if(crossWins){
        infoDisplay.textContent = "Cross Wins!!";
        allSquares.forEach(square=> square.replaceWith(square.cloneNode(true)));
        counter = 0;
        return;
    }else if(counter == 9 && !crossWins){
        infoDisplay.textContent = "Draw!!";
    }
  })

  
  
}
