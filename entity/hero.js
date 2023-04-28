import {cv,ctx} from "../index.js";

let heroIdle = new Image();
let heroWalk = new Image();
let heroJump = new Image();
let heroAttack = new Image();
heroIdle.src = "img/hero/Idle.png";
heroWalk.src = "img/hero/Walk.png";
heroJump.src = "img/hero/Jump.png";
heroAttack.src = "img/hero/Attack.png";

function Player(positer, velocity) {
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
    this.img = heroIdle;
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

export default Player;