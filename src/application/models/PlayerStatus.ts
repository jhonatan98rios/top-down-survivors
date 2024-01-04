
export class PlayerStatus {

    private static instance: PlayerStatus;
    public maxHealth: number
    public currentHealth: number
    public vulnerable: boolean

    constructor () {
        this.maxHealth = 25
        this.currentHealth = 25
        this.vulnerable = true
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
}