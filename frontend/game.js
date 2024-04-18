const mx = 50;
const my = 50;

let canvas;     //vászon
let ctx;        //kontext rövidítése kb. egy ceruza
let isFrozen = false;
let lastMove;
let counter = 0;

const tail = [
    {x: 1, y: 1},
    {x: 2, y: 1},
    {x: 3, y: 1}
];
const freezeSnake = () => {
    isFrozen = !isFrozen; // Toggle the frozen state
    console.log(tail);
    console.log(tail[tail.length - 1].x);
    console.log(tail[tail.length - 1].y);
};

let fruit = {
    x: 12, y: 11
};

let direction = {
    dx: 0, dy: 1  //default down direction
};

const move = () => {
    const oldHead = tail[tail.length - 1];
    const newHead = {
        x: oldHead.x + direction.dx,
        y: oldHead.y + direction.dy
    };

    if (isFrozen) {
        return; // If frozen, do not update snake position
    }
    if (newHead.x >= mx) {
        newHead.x = 0;
    }
    if (newHead.x < 0) {
        newHead.x = mx - 1;
    }
    if (newHead.y >= my) {
        newHead.y = 0;
    }
    if (newHead.y < 0) {
        newHead.y = my - 1;
    }

    if (newHead.x === fruit.x && newHead.y === fruit.y) {
        fruit.x = Math.floor(Math.random() * 50);
        fruit.y = Math.floor(Math.random() * 50);
        counter++;
        resultCounter();
    } else {
        tail.shift(); //remove first element
    }

    tail.push(newHead); //add the new head
    draw();
}


function breath() {

    const snakeHead = tail[tail.length - 1];
    let newDirectionX = 0;
    let newDirectionY = 0;

    if (localStorage.getItem("1") === "ArrowUp") {
        newDirectionX = snakeHead.x * 10;
        newDirectionY = (snakeHead.y - 10) * 10;
    } else if (localStorage.getItem("1") === "ArrowDown") {
        newDirectionX = snakeHead.x * 10;
        newDirectionY = (snakeHead.y + 10) * 10;
    } else if (localStorage.getItem("1") === "ArrowLeft") {
        newDirectionX = (snakeHead.x - 10) * 10;
        newDirectionY = snakeHead.y * 10;
    } else if (localStorage.getItem("1") === "ArrowRight") {
        newDirectionX = (snakeHead.x + 10) * 10;
        newDirectionY = snakeHead.y * 10;
    }

    console.log(localStorage.getItem("1"));
    console.log(snakeHead.x);
    console.log(newDirectionX);
    console.log(snakeHead.y);
    console.log(newDirectionY);
    const fireBreath = ctx.createLinearGradient(
        snakeHead.x * 10, // Multiply by 10 to get canvas coordinates
        snakeHead.y * 10,
        (newDirectionX),
        (newDirectionY)
    );
    fireBreath.addColorStop(0, "red");
    fireBreath.addColorStop(1, "yellow");
    ctx.fillStyle = fireBreath;

    let width = 0;
    let height = 0;
    if (localStorage.getItem("1") === "ArrowUp") {
        height = -50;
        width = 10;
    } else if (localStorage.getItem("1") === "ArrowDown") {
        height = 50;
        width = 10;
    } else if (localStorage.getItem("1") === "ArrowLeft") {
        height = 10;
        width = -50;
    } else if (localStorage.getItem("1") === "ArrowRight") {
        height = 10;
        width = 50;
    }
    ctx.fillRect(snakeHead.x * 10, snakeHead.y * 10, width, height);
}


const draw = () => {
    ctx.clearRect(0, 0, 500, 500);      //letisztítja a vásznat

    ctx.fillStyle = "#0534ee";
    tail.forEach((coord) => {
        ctx.fillRect(coord.x * 10, coord.y * 10, 10, 10);
    });

    ctx.fillStyle = "#d40d0d";
    ctx.fillRect(fruit.x * 10, fruit.y * 10, 10, 10);
};

function resultCounter(){
    document.getElementById("result").innerHTML = "You have eaten " + counter + "apple!";
}

document.addEventListener("DOMContentLoaded", () => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    draw();

    let timerId = setInterval(move, 100);

});

document.addEventListener("keydown", (event) => {
    console.log("Key pressed down:", event);
    if (event.code === "ArrowUp") {
        if (isFrozen) {
            isFrozen = false;
        }
        event.preventDefault();
        direction.dx = 0;
        direction.dy = -1;
        lastMove = event.code;
        localStorage.setItem("1", lastMove);
    }
    if (event.code === "ArrowDown") {
        if (isFrozen) {
            isFrozen = false;
        }
        event.preventDefault();
        direction.dx = 0;
        direction.dy = 1;
        lastMove = event.code;
        localStorage.setItem("1", lastMove);
    }
    if (event.code === "ArrowRight") {
        if (isFrozen) {
            isFrozen = false;
        }
        event.preventDefault();
        direction.dx = 1;
        direction.dy = 0;
        lastMove = event.code;
        localStorage.setItem("1", lastMove);
    }
    if (event.code === "ArrowLeft") {
        if (isFrozen) {
            isFrozen = false;
        }
        event.preventDefault();
        direction.dx = -1;
        direction.dy = 0;
        lastMove = event.code;
        localStorage.setItem("1", lastMove);
    }
    if (event.code === "Space") {
        if (isFrozen) {
            isFrozen = false;
        }
        event.preventDefault();
        breath();
    }
    if (event.code === "Backspace") {
        freezeSnake();
    }
});