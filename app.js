
//game constants and variables 
let inputdir = { x: 0, y: 0 };

const foodsound = new Audio('./music/food.mp3');
const gameoversound = new Audio('./music/gameover.mp3');
const movesound = new Audio('./music/move.mp3');
const musicsound = new Audio('./music/music.mp3');
let board = document.getElementById("board");
let up=document.getElementById("up");
// let up=document.getElementByid("up");
let down=document.getElementById("down");
let right=document.getElementById("right");
let left=document.getElementById("left");

let score = 0;

let speed = 5;
let lastpainttime = 0;

let snakearr = [
    { x: 13, y: 15 }
]

food = { x: 6, y: 7 };



//game function  

function main(ctime) {
    window.requestAnimationFrame(main);

    if ((ctime - lastpainttime) / 1000 < 1 / speed)
        return;
    // console.log(ctime);
    lastpainttime = ctime;
    gameengine();
}

function iscollide(snake) {
    //if u go into yoursel
    for (let i = 1; i < snakearr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }

    }

    //if it get stuck into wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    return false;
}

function gameengine() {
    //updating sanke array and food

    if (iscollide(snakearr)) {
        gameoversound.play();
        musicsound.pause();
        movesound.pause();
        inputdir = { x: 0, y: 0 };
        alert("Game over press any key to play again");
        snakearr = [
            { x: 13, y: 15 }
        ]
        musicsound.play();
        let chirag = document.getElementById("highestscore");
        if (chirag.innerText < score)
            chirag.innerText = score;
        document.getElementById("score").innerText=0
        score = 0;
    }


    //if you have eaten the food increment score and add new food

    if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
        foodsound.play();
        score++;
        snakearr.unshift({ x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
        document.getElementById("score").innerText = score;
        

    }

    //move the snake

    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] };
    }

    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;

    //rendering the snake array 
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeelemet = document.createElement('div');
        snakeelemet.style.gridRowStart = e.y;
        snakeelemet.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeelemet.classList.add('head');
        }
        else {
            snakeelemet.classList.add('snake');
        }
        board.appendChild(snakeelemet);

    });

    //rendering food

    foodelemet = document.createElement('div');
    foodelemet.style.gridRowStart = food.y;
    foodelemet.style.gridColumnStart = food.x;
    foodelemet.classList.add('food');
    board.appendChild(foodelemet);
}








//main logic starts 
window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    inputdir = { x: 0, y: 1 };
    movesound.play();
    musicsound.play();
    // console.log(e.key);
    switch (e.key) {
        case "ArrowUp":
            inputdir.x = 0;
            inputdir.y = -1;
            break;
        case "ArrowDown":
            inputdir.x = 0;
            inputdir.y = 1;
            break;
        case "ArrowRight":
            inputdir.x = 1;
            inputdir.y = 0;
            break;
        case "ArrowLeft":
            inputdir.x = -1;
            inputdir.y = 0;
            break;

        default:
            break;
    }
})

left.addEventListener("click", leftmove);
right.addEventListener("click", rightmove);
up.addEventListener("click", upmove);
down.addEventListener("click", downmove);




function upmove(){
    movesound.play();
    inputdir.x = 0;
    inputdir.y = -1;
}

function downmove(){
    movesound.play();
    inputdir.x = 0;
    inputdir.y = 1;
}

function rightmove(){
    movesound.play();
    inputdir.x = 1;
    inputdir.y = 0;
}

function leftmove(){
    movesound.play();
    inputdir.x = -1;
    inputdir.y = 0;
}
