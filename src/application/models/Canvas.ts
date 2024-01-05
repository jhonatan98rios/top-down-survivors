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
import { isThereIntersection } from "../utils/utils";



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
        
        this.context = this.htmlCanvas.getContext("2d", { alpha: false }) as CanvasRenderingContext2D
        this.scenario = Scenario.getInstance()
        this.camera = Camera.getInstance()
        this.player = Player.getInstance()
        this.enemyService = EnemyService.getInstance()
        this.width = SCREEN_WIDTH, 
        this.height = SCREEN_HEIGHT

        // setInterval(() => {
        //     this.renderBenchmark()
        // }, 1000)
    }

    render(){
        this.clearCanvas()
        this.moveCamera()

        this.scenario.layers.belowThePlayers.forEach(element => {
            this.renderElement(element)
        })

        if (this.game) {
            this.renderOrbs(this.game.orbService.xpOrbs)
            
            this.renderEnemies(this.enemyService.enemies.filter(enemy => enemy.y <= this.player.y))
            this.renderPlayer(this.player)
            this.renderEnemies(this.enemyService.enemies.filter(enemy => enemy.y > this.player.y))

            this.renderSkills(this.game.skillService.activeSkills)
            this.renderStatus()
            
            this.renderBenchmark()
        }

        this.scenario.layers.aboveThePlayers.forEach(element => {
            this.renderElement(element)
        })

        this.context.restore()
    }

    private clearCanvas() {
        this.context.clearRect(0, 0, Math.floor(this.width), Math.floor(this.height));
        this.context.save();
    }

    private moveCamera() {
        this.context.translate(Math.floor(-this.camera.x), Math.floor(-this.camera.y))
    }

    private renderElement(element: Element) {
        const ptrn = this.context.createPattern(element.image, 'repeat') // Create a pattern with this image, and set it to "repeat".
        this.context.fillStyle = ptrn!
        this.context.fillRect(
            Math.floor(element.x), 
            Math.floor(element.y), 
            Math.floor(element.width), 
            Math.floor(element.height)
        );
    }

    private renderPlayer(player: Player) {
        this.context.drawImage(
            player.spritesheet,
            Math.floor(player.srcX), 
            Math.floor(player.srcY), 
            Math.floor(player.width), 
            Math.floor(player.height),
            Math.floor(player.x), 
            Math.floor(player.y), 
            Math.floor(player.width), 
            Math.floor(player.height)
        );
    }

    private renderEnemies(enemies: Enemy[]) {
        enemies.forEach(enemy => {

            if (isThereIntersection(this.camera, enemy)) {
                this.context.drawImage(
                    enemy.spritesheet,
                    Math.floor(enemy.srcX), 
                    Math.floor(enemy.srcY), 
                    Math.floor(enemy.width), 
                    Math.floor(enemy.height),
                    Math.floor(enemy.x), 
                    Math.floor(enemy.y), 
                    Math.floor(enemy.width), 
                    Math.floor(enemy.height)
                );
            }
        })
    }

    private renderSkills(activeSkills: AbstractSkill[]) {

        activeSkills.forEach(activeSkill => {
            if (isThereIntersection(this.camera, activeSkill)){
                this.context.drawImage(
                    activeSkill.spritesheet,
                    Math.floor(activeSkill.srcX),
                    Math.floor(activeSkill.srcY),
                    Math.floor(activeSkill.width),
                    Math.floor(activeSkill.height),
                    Math.floor(activeSkill.x),
                    Math.floor(activeSkill.y),
                    Math.floor(activeSkill.width), 
                    Math.floor(activeSkill.height)
                );
            }
        })
    }

    private renderOrbs(orbs: XPOrb[]) {
        this.context.beginPath();
        orbs.forEach(orb => {
            if (isThereIntersection(this.camera, orb)) {
                this.context.fillStyle = orb.color;
                this.context.fillRect(
                    Math.floor(orb.x),
                    Math.floor(orb.y), 
                    Math.floor(orb.width),
                    Math.floor(orb.height)
                );
            }
        })
    }

    private renderStatus() {
        const { currentHealth, maxHealth } =  this.player.status

        this.context.beginPath();

        this.context.strokeStyle = '#FFFFFF'
        this.context.fillStyle = currentHealth > maxHealth / 2 
            ? "#AAFFCC" : "#FFCCAA"


        this.context.strokeRect(
            Math.floor(this.camera.x + 19), 
            Math.floor(this.camera.y + 19), 
            202, 22
        )


        this.context.fillRect(
            Math.floor(this.camera.x + 20), 
            Math.floor(this.camera.y + 20), 
            Math.floor((currentHealth / maxHealth) * 200), 
            20
        );
    }

    renderBenchmark() {
        if (this.game) {
            this.context.font = "30px Arial";
            this.context.fillText(
                this.game.fps.toString(), 
                Math.floor(this.camera.x + this.camera.width - 50), 
                Math.floor(this.camera.y + 40)
            );
        }
    }

    public static getInstance(): Canvas {
        if (!Canvas.instance) {
            Canvas.instance = new Canvas();
        }

        return Canvas.instance;
    }
}