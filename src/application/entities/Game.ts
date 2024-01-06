import { Camera } from "./Camera"
import { Canvas } from "./Canvas"
import { EventHandler } from "./EventHandler"
import { Scenario } from "./Scenario"
import { Player } from "./Player"
import { PlayerEventService } from "../services/PlayerEventService"
import { EnemyService } from "../services/EnemyService"
import { SkillService } from "../services/SkillService"
import { OrbService } from "../services/OrbService"


export enum GameStatus {
    stopped = 0,
    running = 1,
    paused = 2,
}

export class Game {

    private static instance: Game;

    status: GameStatus
    
    player: Player
    canvas: Canvas
    scenario: Scenario
    eventHandler: EventHandler
    camera: Camera

    playerEventService: PlayerEventService
    enemyService: EnemyService
    skillService: SkillService
    orbService: OrbService

    fps: number
    fpsCounter: number

    constructor() {
        this.status = GameStatus.running

        this.player = Player.getInstance()
        this.canvas = Canvas.getInstance()
        this.scenario = Scenario.getInstance()
        this.eventHandler = EventHandler.getInstance()
        this.camera = Camera.getInstance()

        this.playerEventService = PlayerEventService.getInstance(),
        this.enemyService = EnemyService.getInstance()
        this.skillService = SkillService.getInstance()
        this.orbService = OrbService.getInstance()

        this.canvas.game = this
        this.player.game = this

        this.fps = 0
        this.fpsCounter = 0
        
        setInterval(() => {
            this.fps = this.fpsCounter
            this.fpsCounter = 0
        }, 1000)
    }

    update(){
        if (this.status != GameStatus.running) return
            
        this.playerEventService.execute()
        this.enemyService.move(this)
        this.skillService.move()
        this.skillService.checkCollision()
        this.moveCamera()
    }

    moveCamera() {
        if(this.player.x < this.camera.innerLeftBoundary()){
            this.camera.x = this.player.x - (this.camera.width * 0.25)
        }
        if(this.player.y < this.camera.innerTopBoundary()){
            this.camera.y = this.player.y - (this.camera.height * 0.25)
        }
        if(this.player.x + this.player.width > this.camera.innerRightBoundary()){
            this.camera.x = this.player.x + this.player.width - (this.camera.width * 0.75)
        }
        if(this.player.y + this.player.height > this.camera.innerBottomBoundary()){
            this.camera.y = this.player.y + this.player.height - (this.camera.height * 0.75)
        }
    }

    loop(){
        this.update()
        this.canvas.render()

        this.fpsCounter += 1

        requestAnimationFrame(this.loop.bind(this))
    }


    public static getInstance(): Game {
        if (!Game.instance) {
            Game.instance = new Game();
        }

        return Game.instance;
    }
}
