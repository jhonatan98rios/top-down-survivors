import { Player } from "./Player";

export class PlayerStatus {

    private static instance: PlayerStatus;
    public level: number
    public maxHealth: number
    public currentHealth: number
    public vulnerable: boolean
    public currentXP: number
    public nextLevelXp: number

    constructor () {
        this.level = 1
        this.maxHealth = 50
        this.currentHealth = 50
        this.vulnerable = true
        this.currentXP = 0
        this.nextLevelXp = 5
    }

    public static getInstance(): PlayerStatus {
        if (!PlayerStatus.instance) {
            PlayerStatus.instance = new PlayerStatus();
        }

        return PlayerStatus.instance;
    }

    takeDamage(damage: number) {
        if (this.currentHealth <= 0) {
            return window.location.reload()
        } 
        
        if (!this.vulnerable) return
            
        this.currentHealth -= damage
        this.vulnerable = false

        setTimeout(() => {
            this.vulnerable = true
        }, 1000)
    }

    takeXp(xp: number, player: Player) {
        if (this.currentXP + xp >= this.nextLevelXp) {
            return this.upgrade()
        } 

        this.currentXP += xp
    }

    upgrade() {
        this.level++
        this.nextLevelXp += this.nextLevelXp * 0.75
        this.currentXP = 0
        
        this.maxHealth += 1
        this.currentHealth += 1
    }
}