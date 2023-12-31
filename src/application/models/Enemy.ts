import { Game } from "./Game";
import { Scenario } from "./Scenario";

export enum DIRECTION {
    LEFT = 0,
    RIGHT = 1,
}

interface IEnemy {
    x: number,
    y: number,
    width: number,
    height: number,
    speed: number,
    srcX: number,
    srcY: number,
    direction: DIRECTION
}

type Direction = { mvLeft?: boolean, mvUp?: boolean, mvRight?: boolean, mvDown?: boolean }

export class Enemy {
    id?: string
    x: number
    y: number
    width: number
    height: number
    speed: number
    srcX: number
    srcY: number
    direction: DIRECTION
    countAnim: number
    scenario: Scenario
    game?: Game
    spritesheet: HTMLImageElement

    constructor({ x, y, width, height, speed, srcX, srcY, direction }: IEnemy) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = speed
        this.srcX = srcX
        this.srcY = srcY
        this.direction = direction
        this.scenario = Scenario.getInstance()
        this.countAnim = 0

        this.spritesheet = new Image()
        this.spritesheet.src = "img/players/standard/spritesheet.png"
    }

    move({ mvLeft, mvUp, mvRight, mvDown }: Direction) {
        this.positionAnimation({ mvLeft, mvUp, mvRight, mvDown })
        this.setDirection({ mvLeft, mvUp, mvRight, mvDown })
        this.spriteAnimation()
    }

    private positionAnimation({ mvLeft, mvUp, mvRight, mvDown }: Direction) {

        const TEMP_SPEED = ((mvLeft || mvRight) && (mvDown || mvUp)) 
            ? this.speed / 1.5
            : this.speed
       

        if (mvLeft && !mvRight) {
            this.x = this.x - TEMP_SPEED
            
        } else if (mvRight && !mvLeft) {
            this.x = this.x + TEMP_SPEED
        }

        if (mvUp && !mvDown) {
            this.y = this.y - TEMP_SPEED

        } else if (mvDown && !mvUp) {
            this.y = this.y + TEMP_SPEED
        }
    }

    private setDirection({ mvLeft, mvUp, mvRight, mvDown }: Direction) {
        if (mvLeft && !mvRight) {
            this.direction = DIRECTION.LEFT            
            this.srcY = this.height

        } else if (mvRight && !mvLeft) {
            this.direction = DIRECTION.RIGHT
            this.srcY = this.height * 3
        }

        if (mvUp || mvDown) {
            this.srcY = this.direction == DIRECTION.RIGHT 
                ? this.height * 3
                : this.height
        }

        if (!(mvUp || mvDown || mvLeft || mvRight)) {
            this.srcY = this.direction == DIRECTION.RIGHT 
            ? this.height * 2
            : 0
        }        
    }

    private spriteAnimation() {
        const FRAMES_AMOUNT = 4
        const ANIMATION_SPEED = 1
        const TIME_TO_RESTART = 60 * ANIMATION_SPEED
        const SELECTED_FRAME = Math.floor(this.countAnim / (TIME_TO_RESTART / FRAMES_AMOUNT))
        
        this.countAnim++;

        if (this.countAnim >= TIME_TO_RESTART) {
            this.countAnim = 0;
        }

        this.srcX = SELECTED_FRAME * this.width;
    }
}