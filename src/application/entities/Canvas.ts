import { Camera } from "./Camera";
import { Scenario } from "./Scenario";
import { Player } from "./Player";
import { Game, GameStatus } from "./Game";
import { Element } from "../../database/scenarios/mock";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants";
import { EnemyService } from "../services/EnemyService";
import { Enemy } from "./Enemy";
import { AbstractSkill } from "./skills/AbstractSkill";
import { XPOrb } from "./XPOrb";
import { isThereIntersection } from "../utils/utils";
import { drawAnimatedBar } from "../components/drawAnimatedBar";
import { drawText } from "../components/drawText";
import { drawDeathNotification } from "../components/drawDeathNotification";


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
    }

    render(){

        if (!this.game || this.game.status !== GameStatus.running) return

        this.clearCanvas()
        this.moveCamera()

        this.scenario.layers.belowThePlayers.forEach(element => {
            this.renderElement(element)
        })

        this.renderOrbs(this.game.orbService.xpOrbs)
        
        this.renderEnemies(this.enemyService.enemies.filter(enemy => enemy.y <= this.player.y))
        this.renderPlayer(this.player)
        this.renderEnemies(this.enemyService.enemies.filter(enemy => enemy.y > this.player.y))

        this.renderSkills(this.game.skillService.activeSkills)
        this.renderStatus()

        this.renderEnemiesHEalth()
        
        this.renderBenchmark()


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
        const { currentHealth, maxHealth, currentXP, nextLevelXp } =  this.player.status

        drawText({
            font: "20px Arial",
            context: this.context,
            camera: this.camera,
            value: `Level: ${ this.player.status.level}`,
            posX: 20,
            posY: 30
        })

        drawAnimatedBar({
            context: this.context,
            curentValue: currentHealth,
            maxValue: maxHealth,
            minColor: "#FF5555",
            maxColor: "#55FF55",
            height: 20,
            width: 200,
            posX: this.camera.x + 20,
            posY: this.camera.y + 40
        })

        drawAnimatedBar({
            context: this.context,
            curentValue: currentXP,
            maxValue: nextLevelXp,
            minColor: "#5555FF",
            maxColor: "#AAAAFF",
            height: 20,
            width: 200,
            posX: this.camera.x + 20,
            posY: this.camera.y + 70
        })
    }

    renderEnemiesHEalth() {
        this.enemyService.enemies.forEach(enemy => {

            if (enemy.currentHealth === enemy.maxHealth) return

            drawAnimatedBar({
                context: this.context,
                curentValue: enemy.currentHealth,
                maxValue: enemy.maxHealth,
                minColor: "#5555FF",
                maxColor: "#AAAAFF",
                height: 4,
                width: 30,
                posX: enemy.x + (enemy.width / 2) - 15,
                posY: enemy.y - 10 
            })
        })
    }

    renderBenchmark() {
        if (this.game) {
            drawText({
                font: "30px Arial",
                context: this.context,
                camera: this.camera,
                value: this.game.fps.toString(),
                posX: this.camera.width - 50,
                posY: 40
            })
        }
    }

    renderDeathNotification() {

        this.game.status = GameStatus.stopped

        drawDeathNotification({
            context: this.context,
            height: 300,
            width: 500,
            posY: 200,
            posX: (SCREEN_WIDTH / 2) - 250
        })
    }

    public static getInstance(): Canvas {
        if (!Canvas.instance) {
            Canvas.instance = new Canvas();
        }

        return Canvas.instance;
    }
}