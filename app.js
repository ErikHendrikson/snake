// DOM Elements
const gameContainer = document.getElementById("game-container");

// fields
for (let i = 1; i <= 400; i++) {
    const field = document.createElement("div");
    gameContainer.appendChild(field);
    field.setAttribute("id", i);
}
const border = [];
for (let j = 1; j <= 20; j++) {
    border.push(j);
}
for (let j = 381; j <= 400; j++) {
    border.push(j);
}
for (let j = 21; j <= 381; j+=20) {
    border.push(j);
}
for (let j = 40; j <= 390; j+=20) {
    border.push(j);
};
let allFields = Array.from(gameContainer.children);

// Controls
let snakeDirection = "ArrowRight"; 
window.addEventListener('keydown', function(event) {
    const key = event.code; 
    // if opposite direction is pressed, nothing happens
    if ((snake[0]-snake[1])===1 && key === "ArrowLeft") {
        return null;
    } else if ((snake[0]-snake[1])===-1 && key === "ArrowRight") {
        return null;
    } else if ((snake[0]-snake[1])===-20 && key === "ArrowDown") {
            return null;
    } else if ((snake[0]-snake[1])===20 && key === "ArrowUp") {
        return null;
    } else {
    // if key is pressed, set the direction
        snakeDirection = key}    
});
const controlSteps = (snakeDirection) => {
    switch (snakeDirection) {
        // according to the set direction, add the following field to the (snake)array
    case "ArrowLeft": return -1;
    break;
    
    case "ArrowRight": return +1;
    break;
  
    case "ArrowUp": return -20;
    break;

    case "ArrowDown": return +20;
    break;
    }}

//Starting values
let snake = [202];
let piece = [];
let isPieceShown = false;
let isPlaying = false;

// functions
const startGame = () => {
    window.int1 = setInterval(move, 100);
    isPlaying = true;
}

const randomPiece = () => {
    // pick random number and assign and color grey
    // not possible if the number is included in the snake or border array
    let rp = Math.floor(Math.random()*100);
    if(!border.includes(rp) && !snake.includes(rp)){
        piece.push(rp);
        document.getElementById(`${piece}`).style.backgroundColor="grey";
        isPieceShown = true;
    } else {
        randomPiece();
    };
}

const move = () => {
    // Check if new piece is already taken, if not: select new piece
    if (isPieceShown === false) {
        randomPiece();
    }
    /* Add the newest field to the snake, according to the given direction 
    from the pressed controls */
    snake.unshift((snake[0])+(controlSteps(snakeDirection)));
    // check if new field taken by snake, matches the piece (has it eaten someting?)
    if (snake.includes(piece[0])){
        snake.unshift(piece[0]);
        piece = [];
        isPieceShown = false;
    }
    //remove the last part of the snake and turn in white
    let removedPart = snake.pop(snake);
    document.getElementById(`${removedPart}`).style.backgroundColor="white";
    //set every part of the snake to backgroundcolor black
    snake.forEach(element => {
        document.getElementById(`${element}`).style.backgroundColor="black";
    });
    //Game over check
    gameOverCheck();
};

const gameOverCheck = () => {
    let snakeCheck = snake.slice(2);
    if (border.some(e=>snake.includes(e)) || snakeCheck.some(s => s === snake[0])){
        gameOver();
    }
}

const gameOver = () => {
    clearInterval(window.int1);
    isPlaying = false;
    document.getElementById("score").innerHTML=`Score: ${snake.length-1}`;
    snake = [202];
    piece = [];
    isPieceShown = false;
    
}

// Start Game Button
document.getElementById("start-button").addEventListener("click", function () {
    if (isPlaying === true){
        return null;
    } else {
    allFields.forEach(e => {e.style.backgroundColor="white";});
    border.forEach(element => {
        document.getElementById(`${element}`).style.backgroundColor="black";})
    snakeDirection = "ArrowRight";
    startGame();
}});