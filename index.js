let ctx = document.getElementById("canvasGame");
let cv = ctx.getContext("2d");

let speedMap = 0;//run speed map

ctx.width = innerWidth;
ctx.height = innerHeight;
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
        this.draw();
        this.positer.x += this.velocity.x;
        this.positer.y += this.velocity.y;
        //check vat the roi toi man hinh duoi chua
        if (this.positer.y + this.height >= ctx.height) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += this.gravitation;
        }

    }
}

function MapCreate(positer, status) {
    this.positer = positer;
    this.status = status;
    // this.width = width;
    // this.height = height;
    this.draw = function () {
        cv.fillStyle = "blue";
        cv.fillRect(this.positer.x, this.positer.y, this.status.width, this.status.height);
    }
}

//khoi tao doi tuong
const player = new Player({ x: 1, y: 430 }, { x: 0, y: 10 });

let maps = [new MapCreate({ x: 0, y: ctx.height - 10 }, { width: 2000, height: 10 }),
new MapCreate({ x: 300, y: 250 }, { width: 30, height: 10 }),
new MapCreate({ x: 400, y: 150 }, { width: 200, height: 10 }),
new MapCreate({ x: 500, y: 350 }, { width: 200, height: 10 }),
new MapCreate({ x: 700, y: 350 }, { width: 200, height: 10 }),
];
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
    cv.fillStyle = "white";
    cv.fillRect(0, 0, ctx.width, ctx.height);

    player.update();
    for (let i in maps) {
        maps[i].draw();
        //dung tren map
        if (player.positer.y + player.height <= maps[i].positer.y
            && player.positer.y + player.height + player.velocity.y >= maps[i].positer.y
            && player.positer.x + player.width >= maps[i].positer.x
            && player.positer.x <= maps[i].positer.x + maps[i].status.width) {
            player.velocity.y = 0;
        }

    }

    // key is event
    if (keyEvt.right.visit && player.positer.x < 400) {
        player.velocity.x = 5;
    } else if (keyEvt.left.visit && player.positer.x > 100) {
        player.velocity.x = -5;
    } else {
        player.velocity.x = 0;
        if (keyEvt.right.visit) {
            player.positer.x -= 5;
            for (let i in maps) {
                maps[i].positer.x -= 5
            }
        } else if (keyEvt.left.visit) {

            player.positer.x += 5;
            for (let i in maps) {
                maps[i].positer.x += 5
            }
        }
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
            // if (player.positer.y + player.height >= ctx.height - 10 || player.positer.y + player.height>= (()=>{for(let i in maps) {maps[i].positer.x-10}})) {
            // }
            if (player.positer.y >= 200) {
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