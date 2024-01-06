import { Enemy } from "../entities/Enemy";
import { Player } from "../entities/Player";
import { AbstractSkill } from "../entities/skills/AbstractSkill";
import { SoundAttackLevel_1 } from "../entities/skills/SoundAttackLevel_1";
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
    }
    
    checkCollision() {
        for (let index = 0; index <= this.activeSkills.length; index++) {
            let activeSkill = this.activeSkills[index]

            if (activeSkill) {
                activeSkill.checkCollision(
                    this.enemyService.enemies,
                    this.collision.bind(this)
                )
            }
        }
    }

    collision(skill: AbstractSkill, enemy: Enemy) {
        this.remove(skill.id)
        this.enemyService.applyDamage(enemy, skill.damage)
    }

    remove(id: string) {
        this.activeSkills = this.activeSkills.filter(skill => skill.id != id)
    }
}