import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants";
import { Enemy } from "../models/Enemy"
import { Player } from "../models/Player";
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
        setTimeout(this.spawn.bind(this), 200)
        
        if (this.enemies.length > 200) return

        const randomDistance = {
            x: Math.floor(Math.random() * 200) + SCREEN_WIDTH,
            y: Math.floor(Math.random() * 500) + SCREEN_HEIGHT
        }

        const randomPos = {
            x: randomDistance.x % 2 ? this.player.x - randomDistance.x : this.player.x + randomDistance.x,
            y: randomDistance.y % 2 ? this.player.y - randomDistance.y : this.player.y + randomDistance.y,
        }
        
        this.enemies.push(EnemyFactory.randomCreate(randomPos))
    }


    move() {
        this.enemies.forEach(enemy => {
            enemy.move({
                mvLeft: this.player.x < enemy.x,
                mvRight: this.player.x > enemy.x,
                mvUp: this.player.y < enemy.y,
                mvDown: this.player.y > enemy.y,
            })
        })
    }


    sortEnemies() {
        this.enemies.sort((a, b) => {
            const distanceToA = Math.sqrt(Math.pow(this.player.x - a.x, 2) + Math.pow(this.player.y - a.y, 2));
            const distanceToB = Math.sqrt(Math.pow(this.player.x - b.x, 2) + Math.pow(this.player.y - b.y, 2));
            return distanceToA - distanceToB;
        });
    }

    remove(enemy: Enemy) {
        const { id, x, y, height, width } = enemy
        this.enemies = this.enemies.filter(e => e.id != id)
        this.orbService.spawnXpOrb({
            x: x + (width / 2), 
            y: y + (height / 2)
        })
        
    }


    public static getInstance(): EnemyService {
        if (!EnemyService.instance) {
            EnemyService.instance = new EnemyService()
        }
    
        return EnemyService.instance
    }
      
}