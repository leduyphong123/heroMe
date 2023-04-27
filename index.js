let ctx = document.getElementById("canvasGame");
let cv = ctx.getContext("2d");

//img
let heroIdle = new Image();
let heroWalk = new Image();
let heroJump = new Image();
let heroAttack = new Image();
let monsterBatIdle = new Image();
let monsterSkill = new Image();
let mapDefault = new Image();
let background = new Image();
heroIdle.src = "img/hero/Idle.png";
heroWalk.src = "img/hero/Walk.png";
heroJump.src = "img/hero/Jump.png";
heroAttack.src = "img/hero/Attack.png";
monsterBatIdle.src = "img/monster/BatAlbino_Flying.png";
monsterSkill.src = "img/Free_Skills.png";
mapDefault.src = "img/map/Basic_Top.png";
background.src = "img/map/background.png";


ctx.width = innerWidth;
ctx.height = innerHeight;
function Player(positer, velocity, img) {
    this.positer = positer;
    this.velocity = velocity;
    this.width = 100;
    this.height = 100;
    this.gravitation = 0.2; //trọng lực rơi
    this.hp = 1000;
    this.isAttack;
    this.attackBox = {
        positer: {
            x: this.positer.x,
            y: this.positer.y
        },
        velocity: {
            x: 0,
            y: 0
        },
        width: 70,
        height: this.height,
    };
    this.img = img;
    this.imgIndex = 0;
    this.imgIndexEnd = 14;
    this.imgAnimation = {
        idle: { imge: heroIdle, indexNumber: 14, isThis: true },
        walk: { imge: heroWalk, indexNumber: 8 },
        jump: { imge: heroJump, indexNumber: 19 },
        attack: { imge: heroAttack, indexNumber: 7, isThis: false },
    }
    this.imgRun = this.imgAnimation.idle.imge;
    this.draw = function () {
        if (this.hp > 0) {
            cv.drawImage(this.imgRun, 64 * this.imgIndex, 0, 64, 64, this.positer.x, this.positer.y + 24, this.width, this.height);

            //attackbox
            if (this.isAttack) {
                // cv.fillStyle = "black";
                // cv.fillRect(this.attackBox.positer.x, this.attackBox.positer.y, this.attackBox.width, this.attackBox.height);
                cv.drawImage(this.imgRun, 64 * this.imgIndex, 0, 64, 64, this.attackBox.positer.x, this.attackBox.positer.y, this.attackBox.width, this.attackBox.height);

            }
        }

    }
    this.update = function () {
        this.imgIndex++;
        if (this.imgIndex > this.imgIndexEnd - 1) {
            this.imgIndex = 0;
        }
        this.draw();
        this.positer.x += this.velocity.x;
        this.positer.y += this.velocity.y;
        this.attackBox.positer.x = this.positer.x + this.attackBox.velocity.x;
        this.attackBox.positer.y = this.positer.y
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

function MapCreate(positer, status,img) {
    this.positer = positer;
    this.status = status;
    this.img=img;
    this.draw = function () {

        cv.drawImage(this.img, this.positer.x, this.positer.y, this.status.width, this.status.height);

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
    this.img = monsterBatIdle;
    this.imgIndex = 0;
    this.imgIndexEnd = 4;
    this.imgAnimation = {
        idle: { imge: monsterBatIdle, indexNumber: 4 },
        skill: { imge: monsterSkill, indexNumber: 1 },

    }
    this.imgRun = this.imgAnimation.idle.imge;
    this.draw = function () {
        if (this.hp > 0) {

            cv.drawImage(this.imgRun, 32 * this.imgIndex, 0, 32, 32, this.positer.x, this.positer.y, this.width, this.height);
            //hp
            cv.fillStyle = "gray";
            cv.fillRect(this.positer.x, this.positer.y - 20, this.width, 10);
            cv.fillStyle = "red";
            cv.fillRect(this.positer.x, this.positer.y - 20, this.hp, 10);

            //attack
            if (this.monsterHits) {
                cv.drawImage(this.imgAnimation.skill.imge, 32 * this.imgIndex, 0, 32, 32, this.attackBox.positer.x, this.attackBox.positer.y, this.attackBox.width, this.attackBox.height);

            }
        }
    }
    this.update = function () {
        this.imgIndex++;
        if (this.imgIndex > this.imgIndexEnd - 1) {
            this.imgIndex = 0;
        }
        this.draw();
        this.attackBox.positer.x += this.attackBox.velocity.x;
        this.attackBox.positer.y += this.attackBox.velocity.y;
    }
}

//khoi tao doi tuong
const player = new Player({ x: 100, y: 430 }, { x: 0, y: 10 }, heroIdle);


let maps = [
    new MapCreate({ x: 0, y: 0 }, { width: ctx.width, height: ctx.height },background),
    new MapCreate({ x: ctx.width, y: 0 }, { width: ctx.width, height: ctx.height },background),
new MapCreate({ x: 0, y: ctx.height - 30 }, { width: 3000, height: 30 },mapDefault),
new MapCreate({ x: 300, y: 600 }, { width: 100, height: 10 },mapDefault),
new MapCreate({ x: 450, y: 500 }, { width: 100, height: 10 },mapDefault),
new MapCreate({ x: 500, y: 350 }, { width: 200, height: 10 },mapDefault),
new MapCreate({ x: 700, y: 350 }, { width: 200, height: 10 },mapDefault),
];

let monster = new Monster({ x: 200, y: ctx.height - 70 });

let monsters = [new Monster({ x: 300, y: ctx.height - 70 }),
new Monster({ x: 400, y: ctx.height - 70 }),
new Monster({ x: 600, y: ctx.height - 70 }),
new Monster({ x: 700, y: ctx.height - 70 }),
new Monster({ x: 200, y: ctx.height - 70 })
]

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

    for (let i in maps) {
        maps[i].draw();
        //dung tren map
        if (player.positer.y + player.height <= maps[i].positer.y
            && player.positer.y + player.height + player.velocity.y >= maps[i].positer.y
            && player.positer.x + player.width - 40 >= maps[i].positer.x
            && player.positer.x <= maps[i].positer.x + maps[i].status.width - 40) {
            player.velocity.y = 0;
        }

    }
    player.update();

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
    if (keyEvt.dame.visit === true) {
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
    if (monster.hp > 0 && player.hp > 0
        && player.positer.x >= (monster.positer.x - 200)
        && player.positer.x + player.width <= (monster.positer.x + monster.width + 200)
        && monster.monsterHits == true) {

        if (player.positer.x + player.width <= monster.positer.x) {
            monster.attackBox.velocity.x = - 1;
            if (monster.attackBox.positer.x <= (player.positer.x + player.width)) {
                player.hp -= 10;
                console.log(player.hp + "b");

                monster.attackBox.velocity.x = 0;
                monster.attackBox.positer.x = monster.positer.x;
                monster.attackBox.positer.y = monster.positer.y;
            }
        } else if (player.positer.x >= (monster.positer.x + monster.width)) {
            monster.attackBox.velocity.x = 1;
            if (monster.attackBox.positer.x + monster.attackBox.width >= player.positer.x) {
                player.hp -= 10;
                console.log(player.hp + "a");
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
            player.attackBox.velocity.x = 0;
            player.imgRun = player.imgAnimation.walk.imge;
            player.imgIndexEnd = player.imgAnimation.walk.indexNumber;

            break;
        case "KeyA":
            keyEvt.left.visit = true;
            player.attackBox.velocity.x = -40;
            player.imgRun = player.imgAnimation.walk.imge;
            player.imgIndexEnd = player.imgAnimation.walk.indexNumber;

            break;
        case "Space":
            if (player.positer.y >= 200) {
                player.velocity.y = -10;
                // player.imgRun=player.imgAnimation.jump.imge;
                // player.imgIndexEnd=player.imgAnimation.jump.indexNumber;
            }
            break;
        case "KeyE":
            keyEvt.dame.visit = true;
            playerHits = 1;
            player.imgAnimation.idle.isThis = false;
            if (player.imgAnimation.idle.isThis == false) {
                player.imgRun = player.imgAnimation.attack.imge;
                player.imgIndexEnd = player.imgAnimation.attack.indexNumber;
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
            if (player.imgAnimation.idle.isThis == true) {

                player.imgRun = player.imgAnimation.idle.imge;
                player.imgIndexEnd = player.imgAnimation.idle.indexNumber;
            }

            break;
        case "KeyA":
            keyEvt.left.visit = false;
            if (player.imgAnimation.idle.isThis == true) {

                player.imgRun = player.imgAnimation.idle.imge;
                player.imgIndexEnd = player.imgAnimation.idle.indexNumber;
            }

            break;
        case "KeyE":
            keyEvt.dame.visit = false;
            playerHits = 0;

            setTimeout(() => {
                player.imgRun = player.imgAnimation.idle.imge;
                player.imgIndexEnd = player.imgAnimation.idle.indexNumber;
                player.imgAnimation.idle.isThis = true;
                console.log("a")
            }, 100)
            break;
        default:
            break;
    }
})