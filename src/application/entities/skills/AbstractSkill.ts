import { Enemy } from "../Enemy";

export abstract class AbstractSkill {

    abstract id: string
    abstract width: number
    abstract height: number
    abstract x: number
    abstract y: number
    abstract srcX: number
    abstract srcY: number
    abstract countAnim: number
    abstract spritesheet: HTMLImageElement
    abstract speed: number
    abstract damage: number

    abstract move(): void
    abstract checkCollision(enemies: Enemy[], callback: Function): void
    abstract animate(): void
    abstract effect(): void
}