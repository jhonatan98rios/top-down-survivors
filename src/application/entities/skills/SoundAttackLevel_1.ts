import { UUID, generateUUID } from "../../utils/utils";
import { Enemy } from "../Enemy";
import { AbstractSkill } from "./AbstractSkill";

interface ISoundAttackLevel_1 {
    initialX: number
    initialY: number
    targetX: number
    targetY: number
}

export class SoundAttackLevel_1 implements AbstractSkill {

    id: UUID
    width: number
    height: number
    initialX: number
    initialY: number
    targetX: number
    targetY: number

    x: number
    y: number
    srcX: number
    srcY: number
    countAnim: number
    spritesheet: HTMLImageElement
    speed: number
    
    constructor({ initialX, initialY, targetX, targetY }: ISoundAttackLevel_1) {

        this.id = generateUUID()
        this.x = initialX
        this.y = initialY
        this.initialX = initialX
        this.initialY = initialY
        this.targetX = targetX
        this.targetY = targetY

        this.srcX = 0
        this.srcY = 0
        this.width = 26
        this.height = 26
        this.speed = 5
        
        this.countAnim = 0
        this.spritesheet = new Image()
        this.spritesheet.src = "img/skills/sound_attack_level_1.png"
    }

    move() {
        const deltaX = this.targetX - this.initialX
        const deltaY = this.targetY - this.initialY

        const distance = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY))
        const directionX = deltaX / distance
        const directionY = deltaY / distance
        const velocityX = directionX * this.speed
        const velocityY = directionY * this.speed

        this.x += velocityX
        this.y += velocityY
    }

    animate() {
        throw new Error("Method not implemented.");
    }

    checkCollision(enemies: Enemy[], callback: (skillId: string, enemy: Enemy) => void) {

        for (let index = 0; index < enemies.length; index++) {
            let enemy = enemies[index]

            if ((this.x <= enemy.x + enemy.width) && (this.x + this.width >= enemy.x) && (this.y <= enemy.y + enemy.height && this.y + this.height >= enemy.y)) {
                return callback(this.id, enemy)
            }
        }
    }
    
    effect() {
        throw new Error("Method not implemented.");
    }
}