import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants";
import { DIRECTION, Enemy } from "../models/Enemy"
import { Player } from "../models/Player";

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
        if (this.enemies.length > 10) return

        const randomDistance = {
            x: Math.floor(Math.random() * 200) + SCREEN_WIDTH,
            y: Math.floor(Math.random() * 500) + SCREEN_HEIGHT
        }

        console.log(randomDistance)

        const randomPos = {
            x: randomDistance.x % 2 ? this.player.x - randomDistance.x : this.player.x + randomDistance.x,
            y: randomDistance.y % 2 ? this.player.y - randomDistance.y : this.player.y + randomDistance.y,
        }

        this.enemies.push(new Enemy({
            x: randomPos.x , 
            y: randomPos.y,
            width: 200 / 4,
            height: 400 / 4,
            speed: 2,
            srcX: 0,
            srcY: 100,
            direction: DIRECTION.LEFT,
        }))

        setTimeout(this.spawn.bind(this), 500)
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