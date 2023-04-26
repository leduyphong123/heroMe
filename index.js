let ctx = document.getElementById("canvasGame");
let cv = ctx.getContext("2d");

ctx.width = 1024;
ctx.height = 576;

function Player(positer, velocity) {
    this.positer = positer;
    this.velocity = velocity;
    this.width = 100;
    this.height = 100;
    this.gravitation = 0.2; //trọng lực rơi
    this.draw = function () {

        cv.fillStyle = "red";
        cv.fillRect(this.positer.x, this.positer.y, this.width, this.height);
    }
    this.update = function () {
        this.positer.x += this.velocity.x;
        this.positer.y += this.velocity.y;
        cv.fillStyle = "white";
        cv.fillRect(0, 0, ctx.width, ctx.height);
        this.draw();
        //check vat the roi toi man hinh duoi chua
        if (this.positer.y + this.height >= ctx.height) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += this.gravitation;
        }

    }
}

//khoi tao doi tuong
let player = new Player({ x: 10, y: 10 }, { x: 0, y: 10 });


//key is event
let keyEvt = {
    right: {
        visit: false,
    },
    left: {
        visit: false,
    }
}
//call game
function startGame() {
    window.requestAnimationFrame(startGame);
    player.update()

    // key is event
    player.velocity.x = 0;
    if (keyEvt.right.visit) {
        player.velocity.x = 5;
    } else if (keyEvt.left.visit) {
        player.velocity.x = -5;
    }

}
startGame();


//key value
window.addEventListener("keydown", (evt) => {
    console.log(evt.code);
    switch (evt.code) {
        case "KeyD":
            keyEvt.right.visit = true;
            break;
        case "KeyA":
            keyEvt.left.visit = true;
            break;
        case "Space":
            if (player.positer.y + player.height >= ctx.height - 10) {
                player.velocity.y = -10;
            }
            break;
        default:
            break;
    }
})

window.addEventListener("keyup", (evt) => {
    switch (evt.code) {
        case "KeyD":
            keyEvt.right.visit = false;
            break;
        case "KeyA":
            keyEvt.left.visit = false;
            break;

        default:
            break;
    }
})