import { Enemy } from "../Enemy";

export abstract class AbstractSkill {

    abstract width: number
    abstract height: number
    abstract posX: number
    abstract posY: number
    abstract srcX: number
    abstract srcY: number
    abstract countAnim: number
    abstract spritesheet: HTMLImageElement
    abstract speed: number

    abstract move({ enemies }: { enemies: Enemy[] }): void
    abstract animate(): void
    abstract effect(): void
}