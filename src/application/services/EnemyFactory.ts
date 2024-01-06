import { CachedImages } from "../entities/CachedImages"
import { DIRECTION, Enemy } from "../entities/Enemy"

type RandomPos = {
    x: number,
    y: number
}

export class EnemyFactory {

    static randomCreate(randomPos: RandomPos) {
        const random = Math.floor(Math.random() * 4)

        return ([
            this.createCyclops(randomPos),
            this.createSpirit(randomPos),
            this.createDragon(randomPos),
            this.createCrawler(randomPos),
        ])[random]
    }

    static createSpirit(randomPos: RandomPos) {
        return new Enemy({
            maxHealth: 1,
            damage: 1,
            x: randomPos.x, 
            y: randomPos.y,
            width: 144 / 4,
            height: 150 / 2,
            speed: Math.random() * 2 + 1,
            srcX: 0,
            srcY: 0,
            direction: DIRECTION.LEFT,
            spritesheet: CachedImages.getInstance().getSpirit()
        })
    }

    static createCyclops(randomPos: RandomPos) {
        return new Enemy({
            maxHealth: 3,
            damage: 1,
            x: randomPos.x, 
            y: randomPos.y,
            width: 354 / 4,
            height: 170 / 2,
            speed: Math.random() * 2 + 1,
            srcX: 0,
            srcY: 0,
            direction: DIRECTION.LEFT,
            spritesheet: CachedImages.getInstance().getCyclop()
        })
    }

    static createDragon(randomPos: RandomPos) {
        return new Enemy({
            maxHealth: 5,
            damage: 1,
            x: randomPos.x, 
            y: randomPos.y,
            width: 380 / 4,
            height: 200 / 2,
            speed: 2,
            srcX: 0,
            srcY: 0,
            direction: DIRECTION.LEFT,
            spritesheet: CachedImages.getInstance().getDragon()
        })
    } 

    static createCrawler(randomPos: RandomPos) {
        return new Enemy({
            maxHealth: 5,
            damage: 1,
            x: randomPos.x, 
            y: randomPos.y,
            width: 260 / 4,
            height: 74 / 2,
            speed: 1,
            srcX: 0,
            srcY: 0,
            direction: DIRECTION.LEFT,
            spritesheet: CachedImages.getInstance().getCrawler()
        })
    } 
}