import { Game } from "./Game";
import { Scenario } from "./Scenario";

interface IPlayer {
    x: number,
    y: number,
    width: number,
    height: number,
    speed: number,
    srcX: number,
    srcY: number,
    scenario: Scenario
}

type Direction = { mvLeft?: boolean, mvUp?: boolean, mvRight?: boolean, mvDown?: boolean }

export class Player {
    id?: string
    x: number
    y: number
    width: number
    height: number
    speed: number
    srcX: number
    srcY: number
    countAnim: number
    scenario: Scenario
    game?: Game

    constructor({ x, y, width, height, speed, srcX, srcY, scenario }: IPlayer) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = speed
        this.srcX = srcX
        this.srcY = srcY
        this.scenario = scenario
        this.countAnim = 0
    }

    move({ mvLeft, mvUp, mvRight, mvDown }: Direction) {
        this.positionAnimation({ mvLeft, mvUp, mvRight, mvDown })
        this.setDirection({ mvLeft, mvUp, mvRight, mvDown })
        this.spriteAnimation({ mvLeft, mvUp, mvRight, mvDown })
    }

    private positionAnimation({ mvLeft, mvUp, mvRight, mvDown }: Direction) {
        if (mvLeft && !mvRight) {
            let newPosition = {x: this.x - this.speed, y: this.y}
            this.x = newPosition.x
            
        } else if (mvRight && !mvLeft) {
            let newPosition = {x: this.x + this.speed, y: this.y}
            this.x = newPosition.x
        }

        if (mvUp && !mvDown) {
            let newPosition = { y: this.y - this.speed, x: this.x}
            this.y = newPosition.y

        } else if (mvDown && !mvUp) {
            let newPosition = {y: this.y + this.speed, x: this.x}
            this.y = newPosition.y
        }
    }

    private setDirection({ mvLeft, mvUp, mvRight, mvDown }: Direction) {
        if (mvLeft && !mvRight) {
            this.srcY = this.scenario.blockImageSize + this.height * 2

        } else if (mvRight && !mvLeft) {
            this.srcY = this.scenario.blockImageSize + this.height * 3
        }

        if (mvUp && !mvDown) {
            this.srcY = this.scenario.blockImageSize + this.height * 1

        } else if (mvDown && !mvUp) {
            this.srcY = this.scenario.blockImageSize + this.height * 0
        }
    }

    private spriteAnimation({ mvLeft, mvUp, mvRight, mvDown }: Direction) {
        if (mvLeft || mvRight || mvUp || mvDown) {
            this.countAnim++;

            if (this.countAnim >= 40) {
                this.countAnim = 0;
            }

            this.srcX = Math.floor(this.countAnim / 5) * this.width;
        } else {
            this.srcX = 0;
            this.countAnim = 0;
        }
    }
}