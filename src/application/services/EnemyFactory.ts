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
            health: 1,
            damage: 1,
            x: randomPos.x, 
            y: randomPos.y,
            width: 144 / 4,
            height: 150 / 2,
            speed: Math.random() * 3 + 1,
            srcX: 0,
            srcY: 0,
            direction: DIRECTION.LEFT,
            spritesheetSrc: "img/enemies/spirit.png"
        })
    }

    static createCyclops(randomPos: RandomPos) {
        return new Enemy({
            health: 1,
            damage: 1,
            x: randomPos.x, 
            y: randomPos.y,
            width: 354 / 4,
            height: 170 / 2,
            speed: Math.random() * 2 + 1,
            srcX: 0,
            srcY: 0,
            direction: DIRECTION.LEFT,
            spritesheetSrc: "img/enemies/cyclope.png"
        })
    }

    static createDragon(randomPos: RandomPos) {
        return new Enemy({
            health: 1,
            damage: 1,
            x: randomPos.x, 
            y: randomPos.y,
            width: 380 / 4,
            height: 200 / 2,
            speed: Math.random() * 2 + 1,
            srcX: 0,
            srcY: 0,
            direction: DIRECTION.LEFT,
            spritesheetSrc: "img/enemies/dragon.png"
        })
    } 

    static createCrawler(randomPos: RandomPos) {
        return new Enemy({
            health: 1,
            damage: 1,
            x: randomPos.x, 
            y: randomPos.y,
            width: 260 / 4,
            height: 74 / 2,
            speed: Math.random() * 1 + 0.5,
            srcX: 0,
            srcY: 0,
            direction: DIRECTION.LEFT,
            spritesheetSrc: "img/enemies/crawler.png"
        })
    } 
}