import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants";
import { Enemy } from "./Enemy";
import { Game } from "./Game";
import { PlayerStatus } from "./PlayerStatus";
import { Scenario } from "./Scenario";

export enum DIRECTION {
    LEFT = 0,
    RIGHT = 1,
}

type Direction = { mvLeft?: boolean, mvUp?: boolean, mvRight?: boolean, mvDown?: boolean }

export class Player {

    private static instance: Player;

    status: PlayerStatus
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

    constructor() {
        this.status = PlayerStatus.getInstance()
        this.x = SCREEN_WIDTH / 2
        this.y = SCREEN_HEIGHT / 2
        this.width = 200 / 4
        this.height = 400 / 4
        this.speed = 3
        this.srcX = 0
        this.srcY = 100
        this.direction = DIRECTION.RIGHT
        this.scenario = Scenario.getInstance()
        this.countAnim = 0
        this.spritesheet = new Image()
        this.spritesheet.src = "img/players/standard/spritesheet.png"

        this.spritesheet.addEventListener("load", () => {
            requestAnimationFrame(this.game?.loop.bind(this.game)!);
        }, false);
    }

    update({ mvLeft, mvUp, mvRight, mvDown }: Direction) {
        this.move({ mvLeft, mvUp, mvRight, mvDown })
        this.checkCollision(this.game.enemyService.enemies, (enemy: Enemy) => {
            this.status.takeDamage(3) // enemy.damage
        })

        this.setDirection({ mvLeft, mvUp, mvRight, mvDown })
        this.spriteAnimation()
    }

    private move({ mvLeft, mvUp, mvRight, mvDown }: Direction) {

        const TEMP_SPEED = ((mvLeft || mvRight) && (mvDown || mvUp)) 
            ? this.speed / 1.4
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

    public checkCollision(enemies: Enemy[], callback: (enemy: Enemy) => void) {

        for (let index = 0; index < enemies.length; index++) {
            let enemy = enemies[index]

            if ((this.x <= enemy.x + enemy.width) && (this.x + this.width >= enemy.x) && (this.y <= enemy.y + enemy.height && this.y + this.height >= enemy.y)) {
                return callback(enemy)
            }
        }
    }

    public static getInstance(): Player {
        if (!Player.instance) {
            Player.instance = new Player();
        }

        return Player.instance;
    }
}