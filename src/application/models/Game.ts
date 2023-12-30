import { Camera } from "./Camera"
import { Canvas } from "./Canvas"
import { EventHandler } from "./EventHandler"
import { Scenario } from "./Scenario"
import { Player } from "./Player"
import { PlayerEventService } from "../services/PlayerEventService"

interface IGame {
    player: Player
    canvas: Canvas
    scenario: Scenario
    eventHandler: EventHandler
    camera: Camera
    playerEventService: PlayerEventService
}

export class Game {
    player: Player
    canvas: Canvas
    scenario: Scenario
    eventHandler: EventHandler
    camera: Camera
    playerEventService: PlayerEventService

    // fps: number

    constructor({ player, canvas, scenario, eventHandler, camera, playerEventService }: IGame) {
        this.player = player
        this.canvas = canvas
        this.scenario = scenario
        this.eventHandler = eventHandler
        this.camera = camera
        this.playerEventService = playerEventService

        this.canvas.game = this
        this.player.game = this

        // this.fps = 0
        // setInterval(() => {
        //     console.log(this.fps)
        //     this.fps = 0
        // }, 1000)
    }

    update(){
        this.player.move({ 
            mvDown: this.eventHandler.mvDown,
            mvLeft: this.eventHandler.mvLeft,
            mvRight: this.eventHandler.mvRight,
            mvUp: this.eventHandler.mvUp
         })
        
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
        this.playerEventService.execute()

        this.canvas.render()

        // this.fps += 1

        requestAnimationFrame(this.loop.bind(this))
    }
}