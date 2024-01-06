import { Element2D, UUID, calculate2DMovement, generateUUID, isThereIntersection } from "../utils/utils";
import { Player } from "./Player";
import { Scenario } from "./Scenario";

export enum DIRECTION {
    LEFT = 0,
    RIGHT = 1,
}

interface IEnemy {
    maxHealth: number
    x: number
    y: number
    width: number
    height: number
    speed: number
    srcX: number
    srcY: number
    direction: DIRECTION
    spritesheet: HTMLImageElement
    damage: number
}

type Direction = { mvLeft?: boolean, mvUp?: boolean, mvRight?: boolean, mvDown?: boolean }

export class Enemy {
    id: UUID
    maxHealth: number
    currentHealth: number
    damage: number
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
    spritesheet: HTMLImageElement

    constructor({ maxHealth, damage, x, y, width, height, speed, srcX, srcY, direction, spritesheet }: IEnemy) {
        this.id = generateUUID()
        this.maxHealth = maxHealth
        this.currentHealth = maxHealth
        this.damage = damage
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = speed
        this.srcX = srcX
        this.srcY = srcY
        this.direction = direction
        this.countAnim = 0
        this.spritesheet = spritesheet
    }

    move(player: Player, isVisible: boolean) {
        this.positionAnimation(player)

        if (isVisible) {
            this.setDirection({ 
                mvLeft: player.x < this.x,
                mvRight: player.x > this.x,
                mvUp: player.y < this.y,
                mvDown: player.y > this.y,
            })
            this.spriteAnimation()
        }
    }

    positionAnimation(player: Player) {
        
        const { x: directionX, y: directionY } = calculate2DMovement(this, player)
        const velocityX = directionX * this.speed
        const velocityY = directionY * this.speed

        const newX = this.x + velocityX
        const newY = this.y + velocityY

        let shouldMoveX = !this.checkCollision(
            { ...this, x: newX }, 
            player.game.enemyService.enemies
        )
        let shouldMoveY = !this.checkCollision(
            { ...this, y: newY }, 
            player.game.enemyService.enemies
        )

        this.x = shouldMoveX ? newX : this.x
        this.y = shouldMoveY ? newY : this.y
    }

    private setDirection({ mvLeft, mvUp, mvRight, mvDown }: Direction) {
        if (mvLeft && !mvRight) {
            this.direction = DIRECTION.LEFT            
            this.srcY = this.height

        } else if (mvRight && !mvLeft) {
            this.direction = DIRECTION.RIGHT
            this.srcY = 0
        }

        if (mvUp || mvDown) {
            this.srcY = this.direction == DIRECTION.RIGHT 
                ? 0
                : this.height
        }     
    }

    private spriteAnimation() {
        const FRAMES_AMOUNT = 4
        const ANIMATION_SPEED = 0.5
        const TIME_TO_RESTART = 60 * ANIMATION_SPEED
        const SELECTED_FRAME = Math.floor(this.countAnim / (TIME_TO_RESTART / FRAMES_AMOUNT))
        
        this.countAnim++;

        if (this.countAnim >= TIME_TO_RESTART) {
            this.countAnim = 0;
        }

        this.srcX = SELECTED_FRAME * this.width;
    }

    public checkCollision(enemy: Enemy, enemies: Enemy[]) {

        for (let index = 0; index < enemies.length; index++) {
            let otherEnemy = enemies[index]

            if (enemy.id != otherEnemy.id) {
                if (isThereIntersection(enemy, otherEnemy)) {
                    return true
                }
            }
        }
    
        return false
    }
}