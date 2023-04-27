let ctx = document.getElementById("canvasGame");
let cv = ctx.getContext("2d");


ctx.width = innerWidth;
ctx.height = innerHeight;
function Player(positer, velocity) {
    this.positer = positer;
    this.velocity = velocity;
    this.width = 30;
    this.height = 100;
    this.gravitation = 0.2; //trọng lực rơi
    this.hp=1000;
    this.isAttack;
    this.offSet={x:0,y:0}
    this.attackBox = {
        positer: {
            x:this.positer.x,
            y:this.positer.y
        },
        velocity:{
            x:0,
            y:0
        },
        width: 70,
        height: this.height,
    }

    this.draw = function () {
        if(this.hp>0){
            cv.fillStyle = "red";
            cv.fillRect(this.positer.x, this.positer.y, this.width, this.height);
    
            //attackbox
            if (this.isAttack) {
                cv.fillStyle = "black";
                cv.fillRect(this.attackBox.positer.x, this.attackBox.positer.y, this.attackBox.width, this.attackBox.height);
            }
        }

    }
    this.update = function () {
        this.draw();
        this.positer.x += this.velocity.x;
        this.positer.y += this.velocity.y;
        this.attackBox.positer.x=this.positer.x+this.attackBox.velocity.x;
        this.attackBox.positer.y=this.positer.y
        //check vat the roi toi man hinh duoi chua
        if (this.positer.y + this.height >= ctx.height) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += this.gravitation;
        }

        this.attack = function () {
            this.isAttack = true;
            setTimeout(() => { this.isAttack = false }, 100);
        }

    }
}

function MapCreate(positer, status) {
    this.positer = positer;
    this.status = status;
    this.draw = function () {
        cv.fillStyle = "blue";
        cv.fillRect(this.positer.x, this.positer.y, this.status.width, this.status.height);
    }
}

function Monster(positer) {
    this.positer = positer;
    this.width = 50;
    this.height = 50;
    this.hp = 50;
    this.dameAttack = 0;
    this.monsterHits;
    this.attackBox = {
        positer: {
            x: this.positer.x,
            y: this.positer.y
        },
        velocity: {
            x: 0,
            y: 0
        },
        width: 20,
        height: 20,
    }
    this.draw = function () {
        if(this.hp>0){

            cv.fillStyle = "yellow";
            cv.fillRect(this.positer.x, this.positer.y, this.width, this.height);
    
            //hp
            cv.fillStyle = "gray";
            cv.fillRect(this.positer.x, this.positer.y - 20, this.width, 10);
            cv.fillStyle = "red";
            cv.fillRect(this.positer.x, this.positer.y - 20, this.hp, 10);
    
            //attack
            if (this.monsterHits) {   
                cv.fillStyle = "red";
                cv.fillRect(this.attackBox.positer.x, this.attackBox.positer.y, this.attackBox.width, this.attackBox.height);
            }
        }
    }
    this.update = function () {
        this.draw();
        this.attackBox.positer.x += this.attackBox.velocity.x;
        this.attackBox.positer.y += this.attackBox.velocity.y;
    }
}

//khoi tao doi tuong
const player = new Player({ x: 100, y: 430 }, { x: 0, y: 10 });

let maps = [new MapCreate({ x: 0, y: ctx.height - 10 }, { width: 2000, height: 10 }),
new MapCreate({ x: 300, y: 250 }, { width: 30, height: 10 }),
new MapCreate({ x: 400, y: 150 }, { width: 200, height: 10 }),
new MapCreate({ x: 500, y: 350 }, { width: 200, height: 10 }),
new MapCreate({ x: 700, y: 350 }, { width: 200, height: 10 }),
];

let monster = new Monster({ x: 200, y: ctx.height - 80 });
//key is event
let keyEvt = {
    right: {
        visit: false,
    },
    left: {
        visit: false,
    },
    dame: {
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
    monster.update();

    // key is event
    if (keyEvt.right.visit && player.positer.x < 400) {
        player.velocity.x = 5;
    } else if (keyEvt.left.visit && player.positer.x > 100) {
        player.velocity.x = -5;
    } else {
        player.velocity.x = 0;
        if (keyEvt.right.visit) {
            player.positer.x -= 5;
            //map remote
            for (let i in maps) {
                maps[i].positer.x -= 5;
            }
            //monter remote
            monster.positer.x -= 5;
        } else if (keyEvt.left.visit) {

            player.positer.x += 5;
            //map remote
            for (let i in maps) {
                maps[i].positer.x += 5
            }
            //monter remote
            monster.positer.x += 5;
        }
    }


    //attack hero
    if(keyEvt.dame.visit===true){
        player.attack();

    }
    if (player.attackBox.positer.x + player.attackBox.width >= monster.positer.x
        && player.attackBox.positer.x <= monster.positer.x + monster.width
        && player.attackBox.positer.y + player.attackBox.height >= monster.positer.y
        && player.attackBox.positer.y <= monster.positer.y + monster.height
        && playerHits == 1
    ) {
        if (keyEvt.dame.visit === true) {
            player.attack();
            monster.hp -= 1;
            console.log(monster.dameAttack);
            monster.monsterHits = true;
        }
        playerHits = 0;
    }

    // monster dame hero
    if ( monster.hp > 0 && player.hp>0
        && player.positer.x >= (monster.positer.x - 200)
        && player.positer.x + player.width <= (monster.positer.x + monster.width + 200)
        && monster.monsterHits == true) {

        if (player.positer.x + player.width <= monster.positer.x) {
            monster.attackBox.velocity.x = - 1;
            if (monster.attackBox.positer.x <= (player.positer.x + player.width)
            ) {
                player.hp-=10;
                console.log(player.hp);

                monster.attackBox.velocity.x = 0;
                monster.attackBox.positer.x = monster.positer.x;
                monster.attackBox.positer.y = monster.positer.y;
            }
        } else if (player.positer.x >= monster.positer.x + monster.width) {
            monster.attackBox.velocity.x = 1;
            if (monster.attackBox.positer.x + monster.attackBox.width >= player.positer.x) {
                player.hp-=100;
                console.log(player.hp);
                monster.attackBox.velocity.x = 0;
                monster.attackBox.positer.x = monster.positer.x;
                monster.attackBox.positer.y = monster.positer.y;
            }
        }

    }

}
startGame();
let playerHits; // dem lan danh cua hero


//key value
window.addEventListener("keydown", (evt) => {
    console.log(evt.code);
    switch (evt.code) {
        case "KeyD":
            keyEvt.right.visit = true;
            player.attackBox.velocity.x=0;

            break;
        case "KeyA":
            keyEvt.left.visit = true;
            player.attackBox.velocity.x=-40;
            break;
        case "Space":
            if (player.positer.y >= 200) {
                player.velocity.y = -player.width;
            }
            break;
        case "KeyE":
            keyEvt.dame.visit = true;
            playerHits = 1;
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
        case "KeyE":
            keyEvt.dame.visit = false;
            playerHits = 0;
            break;
        default:
            break;
    }
})