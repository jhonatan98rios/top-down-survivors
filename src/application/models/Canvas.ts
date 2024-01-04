import { Camera } from "./Camera";
import { Scenario } from "./Scenario";
import { Player } from "./Player";
import { Game } from "./Game";
import { Element } from "../../database/scenarios/mock";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants";
import { EnemyService } from "../services/EnemyService";
import { Enemy } from "./Enemy";
import { AbstractSkill } from "./skills/AbstractSkill";
import { XPOrb } from "./XPOrb";



export class Canvas {

    private static instance: Canvas;
    
    htmlCanvas: HTMLCanvasElement
    context: CanvasRenderingContext2D;
    scenario: Scenario
    width: number
    height: number
    camera: Camera
    player: Player
    game?: Game
    enemyService: EnemyService
    

    constructor() {
        this.htmlCanvas = document.querySelector("canvas") as HTMLCanvasElement
        this.htmlCanvas.width = SCREEN_WIDTH
        this.htmlCanvas.height = SCREEN_HEIGHT
        
        this.context = this.htmlCanvas.getContext("2d") as CanvasRenderingContext2D
        this.scenario = Scenario.getInstance()
        this.camera = Camera.getInstance()
        this.player = Player.getInstance()
        this.enemyService = EnemyService.getInstance()
        this.width = SCREEN_WIDTH, 
        this.height = SCREEN_HEIGHT
    }

    render(){
        this.clearCanvas()
        this.moveCamera()

        this.scenario.layers.belowThePlayers.forEach(element => {
            this.renderElement(element)
        })

        if (this.game) {
            this.renderOrbs(this.game.orbService.xpObs)
            
            this.renderEnemies(this.enemyService.enemies.filter(enemy => enemy.y <= this.player.y))
            this.renderPlayer(this.player)
            this.renderEnemies(this.enemyService.enemies.filter(enemy => enemy.y > this.player.y))

            this.renderSkills(this.game.skillService.activeSkills)

            this.renderStatus()
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
        const ptrn = this.context.createPattern(element.image, 'repeat') // Create a pattern with this image, and set it to "repeat".
        this.context.fillStyle = ptrn!
        this.context.fillRect(element.x, element.y, element.width, element.height);
    }

    private renderPlayer(player: Player) {
        this.context.drawImage(
            player.spritesheet,
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

    private renderEnemies(enemies: Enemy[]) {
        enemies.forEach(enemy => {
            this.context.drawImage(
                enemy.spritesheet,
                enemy.srcX, 
                enemy.srcY, 
                enemy.width, 
                enemy.height,
                enemy.x, 
                enemy.y, 
                enemy.width, 
                enemy.height
            );
        })
    }

    private renderSkills(activeSkills: AbstractSkill[]) {
        activeSkills.forEach(activeSkill => {
            this.context.drawImage(
                activeSkill.spritesheet,
                activeSkill.srcX, 
                activeSkill.srcY, 
                activeSkill.width, 
                activeSkill.height,
                activeSkill.posX, 
                activeSkill.posY, 
                activeSkill.width, 
                activeSkill.height
            );
        })
    }

    private renderOrbs(orbs: XPOrb[]) {
        this.context.beginPath();
        orbs.forEach(orb => {
            //this.context.rect(orb.x, orb.y, orb.width, orb.height)
            this.context.fillStyle = orb.color;
            this.context.fillRect(orb.x, orb.y,  orb.width, orb.height);
        })
    }

    private renderStatus() {
        const { currentHealth, maxHealth } =  this.player.status

        this.context.beginPath();
        this.context.fillStyle = currentHealth > maxHealth / 2 
            ? "#AAFFCC" : "#FFCCAA"

        this.context.fillRect(
            this.camera.x + 20, 
            this.camera.y + 20, 
            (currentHealth / maxHealth) * 200, 
            20
        );
        
    }

    public static getInstance(): Canvas {
        if (!Canvas.instance) {
            Canvas.instance = new Canvas();
        }

        return Canvas.instance;
    }
}