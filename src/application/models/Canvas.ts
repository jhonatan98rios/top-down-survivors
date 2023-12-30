import { Camera } from "./Camera";
import { Scenario } from "./Scenario";
import { Player } from "./Player";
import { Game } from "./Game";
import { Element } from "../../database/scenarios/mock";

interface ICanvas {
    context: CanvasRenderingContext2D
    scenario: Scenario
    width: number
    height: number
    camera: Camera
    playerSpritesheet: HTMLImageElement
    player: Player
}

export class Canvas {
    context: CanvasRenderingContext2D;
    scenario: Scenario
    width: number
    height: number
    camera: Camera
    player: Player
    playerSpritesheet: HTMLImageElement
    game?: Game
    

    constructor({ context, scenario, width, height, camera, player, playerSpritesheet }: ICanvas) {
        this.context = context
        this.scenario = scenario
        this.width = width, 
        this.height = height
        this.camera = camera
        this.player = player
        this.playerSpritesheet = playerSpritesheet
    }

    render(){
        
        this.clearCanvas()
        this.moveCamera()

        this.scenario.layers.belowThePlayers.forEach(element => {
            this.renderElement(element)
        })

        if (this.game) {
            this.renderPlayer(this.player)
        }

        this.scenario.layers.aboveThePlayers.forEach(element => {
            this.renderElement(element)
        })

        this.context.restore()
    }

    private clearCanvas() {
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.save();
    }

    private moveCamera() {
        this.context.translate(-this.camera.x,-this.camera.y)
    }

    private renderElement(element: Element) {
        this.context.drawImage(
            element.image as CanvasImageSource,
            element.x,
            element.y,
            element.width,
            element.height
        )
    }

    private renderPlayer(player: Player) {
        this.context.drawImage(
            this.playerSpritesheet,
            player.srcX, 
            player.srcY, 
            player.width, 
            player.height,
            player.x, 
            player.y, 
            player.width, 
            player.height
        );
    }
}