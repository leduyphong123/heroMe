import MapCreate from "./entity/map.js";
import Player from "./entity/hero.js";
import Monster from "./entity/monster.js";

let ctx = document.getElementById("canvasGame");
let cv = ctx.getContext("2d");

//img

let mapDefault = new Image();
let background = new Image();
mapDefault.src = "img/map/Basic_Top.png";
background.src = "img/map/background.png";


ctx.width = 1024;
ctx.height = 567;

//khoi tao doi tuong
const player = new Player({ x: 100, y: 430 }, { x: 0, y: 10 });


let maps = [
    new MapCreate({ x: 0, y: 0 }, { width: ctx.width, height: ctx.height }, background),
    new MapCreate({ x: ctx.width, y: 0 }, { width: ctx.width, height: ctx.height }, background),
    new MapCreate({ x: 0, y: ctx.height - 30 }, { width: 3000, height: 30 }, mapDefault),
    new MapCreate({ x: 300, y: 600 }, { width: 100, height: 10 }, mapDefault),
    new MapCreate({ x: 450, y: 500 }, { width: 100, height: 10 }, mapDefault),
    new MapCreate({ x: 500, y: 350 }, { width: 200, height: 10 }, mapDefault),
    new MapCreate({ x: 700, y: 350 }, { width: 200, height: 10 }, mapDefault),
];

let monster = new Monster({ x: 200, y: ctx.height - 70 });

let monsters = [
    new Monster({ x: 300, y: ctx.height - 70 }),
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

export {cv,ctx};
