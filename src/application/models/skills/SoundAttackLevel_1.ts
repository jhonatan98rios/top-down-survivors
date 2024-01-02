import { Enemy } from "../Enemy";
import { Player } from "../Player";
import { AbstractSkill } from "./AbstractSkill";

interface ISoundAttackLevel_1 {
    initialX: number
    initialY: number
    targetX: number
    targetY: number
}

export class SoundAttackLevel_1 implements AbstractSkill {

    width: number
    height: number
    initialX: number
    initialY: number
    targetX: number
    targetY: number

    posX: number
    posY: number
    srcX: number
    srcY: number
    countAnim: number
    spritesheet: HTMLImageElement
    speed: number
    
    constructor({ initialX, initialY, targetX, targetY }: ISoundAttackLevel_1) {
        this.posX = initialX
        this.posY = initialY
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

    move({ enemies }: { enemies: Enemy[] }) {
        const deltaX = this.targetX - this.initialX
        const deltaY = this.targetY - this.initialY

        const distance = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY))
        const directionX = deltaX / distance
        const directionY = deltaY / distance
        const velocityX = directionX * this.speed
        const velocityY = directionY * this.speed

        this.posX += velocityX
        this.posY += velocityY
    }

    animate() {
        throw new Error("Method not implemented.");
    }
    
    effect() {
        throw new Error("Method not implemented.");
    }

}