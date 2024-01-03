import { Player } from "../models/Player";
import { AbstractSkill } from "../models/skills/AbstractSkill";
import { SoundAttackLevel_1 } from "../models/skills/SoundAttackLevel_1";
import { EnemyService } from "./EnemyService";

export class SkillService {

    private static instance: SkillService
    public activeSkills: AbstractSkill[]
    public player: Player
    public enemyService: EnemyService

    constructor() {
        this.activeSkills = []
        this.player = Player.getInstance()
        this.enemyService = EnemyService.getInstance()

        setTimeout(this.spawn.bind(this), 500)
    }

    public static getInstance(): SkillService {
        if (!SkillService.instance) {
            SkillService.instance = new SkillService()
        }
    
        return SkillService.instance
    }

    spawn() {
        const range_area = {
            left: this.player.x - 500,
            top: this.player.y - 500,
            right: this.player.x + 500,
            bottom: this.player.y + 500,
        }

        const nearby_enemies = this.enemyService.enemies.filter(enemy => {
            return enemy.x >= range_area.left
                && enemy.x <= range_area.right
                && enemy.y >= range_area.top
                && enemy.y <= range_area.bottom
        })
        

        if (nearby_enemies.length > 0) {
            const sound_attack_level_1 = new SoundAttackLevel_1({ 
                initialX: this.player.x,
                initialY: this.player.y + (this.player.height / 2),
                targetX: this.enemyService.enemies[0].x,
                targetY: this.enemyService.enemies[0].y + (this.enemyService.enemies[0].height / 2),
            })
    
            this.activeSkills.push(sound_attack_level_1)
        }

        setTimeout(this.spawn.bind(this), 500)
    }

    move() {
        this.activeSkills.forEach(activeSkill => activeSkill.move())
        this.activeSkills.forEach((activeSkill, index) => {
            activeSkill.checkCollision(
                this.enemyService.enemies,
                // Remove the skill after collision
                () => { this.activeSkills.splice(index, 1) 
            })
        })
    }
}