import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants";
import { DIRECTION, Enemy } from "../models/Enemy"
import { Player } from "../models/Player";
import { EnemyFactory } from "./EnemyFactory";

export class EnemyService {

    private static instance: EnemyService;

    player: Player
    enemies: Enemy[]

    constructor() {
        this.player = Player.getInstance()
        this.enemies = []
        this.spawn()
    }

    spawn() {
        //if (this.enemies.length > 50) return

        const randomDistance = {
            x: Math.floor(Math.random() * 200) + SCREEN_WIDTH,
            y: Math.floor(Math.random() * 500) + SCREEN_HEIGHT
        }

        const randomPos = {
            x: randomDistance.x % 2 ? this.player.x - randomDistance.x : this.player.x + randomDistance.x,
            y: randomDistance.y % 2 ? this.player.y - randomDistance.y : this.player.y + randomDistance.y,
        }

        this.enemies.push(EnemyFactory.randomCreate(randomPos))

        setTimeout(this.spawn.bind(this), 100)
    }


    move() {
        this.enemies.forEach(enemy => {
            enemy.move({
                mvLeft: this.player.x < enemy.x,
                mvRight: this.player.x > enemy.x,
                mvUp: this.player.y < enemy.y,
                mvDown: this.player.y > enemy.y,
            })

            //console.log(enemy)
        })
    }


    public static getInstance(): EnemyService {
        if (!EnemyService.instance) {
            EnemyService.instance = new EnemyService()
        }
    
        return EnemyService.instance
    }
      
}