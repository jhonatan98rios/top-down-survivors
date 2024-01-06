import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants";
import { Enemy } from "../entities/Enemy"
import { Game } from "../entities/Game";
import { Player } from "../entities/Player";
import { Element2D, isThereIntersection } from "../utils/utils";
import { EnemyFactory } from "./EnemyFactory";
import { OrbService } from "./OrbService";

export class EnemyService {

    private static instance: EnemyService;

    player: Player
    enemies: Enemy[]
    orbService: OrbService

    constructor() {
        this.player = Player.getInstance()
        this.enemies = []
        this.spawn()

        this.orbService = OrbService.getInstance()
    }

    spawn() {
        this.sortEnemies()
        setTimeout(this.spawn.bind(this), 300)
        
        if (this.enemies.length >= 200) return

        const randomDistance = {
            x: Math.floor(Math.random() * 1000) + (SCREEN_WIDTH / 2),
            y: Math.floor(Math.random() * 1000) + (SCREEN_HEIGHT / 2)
        }

        const randomPos = {
            x: randomDistance.x % 2 ? this.player.x - randomDistance.x : this.player.x + randomDistance.x,
            y: randomDistance.y % 2 ? this.player.y - randomDistance.y : this.player.y + randomDistance.y,
        }

        const createdEnemy = EnemyFactory.randomCreate(randomPos)

        if (!this.checkEmptySpaceToSpawn(createdEnemy)) {
            return
        }
        
        this.enemies.push(createdEnemy)
    }

    move(game: Game) {
        this.enemies.forEach(enemy => {
            enemy.move(game.player, isThereIntersection(game.camera, enemy))
        })
    }

    sortEnemies() {
        this.enemies.sort((a, b) => {
            const distanceToA = Math.sqrt(Math.pow(this.player.x - a.x, 2) + Math.pow(this.player.y - a.y, 2));
            const distanceToB = Math.sqrt(Math.pow(this.player.x - b.x, 2) + Math.pow(this.player.y - b.y, 2));
            return distanceToA - distanceToB;
        });
    }

    applyDamage(enemy: Enemy, damage: number) {
        enemy.currentHealth -= damage

        if (enemy.currentHealth <= 0) {
            this.remove(enemy)
        }
    }

    remove(enemy: Enemy) {
        const { id, x, y, height, width } = enemy
        this.enemies = this.enemies.filter(e => e.id != id)
        this.orbService.spawnXpOrb({
            value: enemy.maxHealth,
            x: x + (width / 2), 
            y: y + (height / 2)
        })
    }

    checkEmptySpaceToSpawn(body: Element2D) {
        for (let index = 0; index <= this.enemies.length - 1; index++) {
            let otherEnemy = this.enemies[index]

            if (isThereIntersection(body, otherEnemy)) {
                console.log("There is Intersection!")
                return false
            }
        }

        return true
    }

    public static getInstance(): EnemyService {
        if (!EnemyService.instance) {
            EnemyService.instance = new EnemyService()
        }
    
        return EnemyService.instance
    }
}