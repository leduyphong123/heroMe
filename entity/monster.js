import {cv} from "../index.js";

let monsterBatIdle = new Image();
let monsterSkill = new Image();
monsterBatIdle.src = "img/monster/BatAlbino_Flying.png";
monsterSkill.src = "img/Free_Skills.png";

function Monster(positer, hero) {
    this.positer = positer;
    this.width = 50;
    this.height = 50;
    this.hp = 50;
    this.monsterHits;
    this.player = hero
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
    this.dameHero = function () {
        // monster dame hero
        if (this.hp > 0 && this.player.hp > 0
            && this.player.positer.x >= (this.positer.x - 200)
            && this.player.positer.x + this.player.width <= (this.positer.x + this.width + 200)
            && this.monsterHits == true) {

            if (this.player.positer.x + this.player.width <= this.positer.x) {
                this.attackBox.velocity.x = - 1;
                if (this.attackBox.positer.x <= (this.player.positer.x + this.player.width)) {
                    this.player.hp -= 10;
                    console.log(this.player.hp + "b");

                    this.attackBox.velocity.x = 0;
                    this.attackBox.positer.x = this.positer.x;
                    this.attackBox.positer.y = this.positer.y;
                }
            } else if (this.player.positer.x >= (this.positer.x + this.width)) {
                this.attackBox.velocity.x = 1;
                if (this.attackBox.positer.x + this.attackBox.width >= this.player.positer.x) {
                    this.player.hp -= 10;
                    console.log(this.player.hp + "a");
                    this.attackBox.velocity.x = 0;
                    this.attackBox.positer.x = this.positer.x;
                    this.attackBox.positer.y = this.positer.y;
                }
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

        if(this.hp!=50){
            this.dameHero();
        }
    }
}
export default Monster;