import { Player } from "../entities/Player";
import { XPOrb } from "../entities/XPOrb";

export class OrbService {

    private static instance: OrbService;

    player: Player
    xpOrbs: XPOrb[]

    constructor() {
        this.player = Player.getInstance()
        this.xpOrbs = []
    }

    spawnXpOrb({ x, y, value }: Partial<XPOrb>) {
        this.xpOrbs.push(
            new XPOrb({ x, y, value })
        )       
        this.sortOrbs()        
    }

    sortOrbs() {
        this.xpOrbs.sort((a, b) => {
            const distanceToA = Math.sqrt(Math.pow(this.player.x - a.x, 2) + Math.pow(this.player.y - a.y, 2));
            const distanceToB = Math.sqrt(Math.pow(this.player.x - b.x, 2) + Math.pow(this.player.y - b.y, 2));
            return distanceToA - distanceToB;
        });
    }

    remove(id: string) {
        this.xpOrbs = this.xpOrbs.filter(orb => orb.id != id)
    }

    public static getInstance(): OrbService {
        if (!OrbService.instance) {
            OrbService.instance = new OrbService()
        }
    
        return OrbService.instance
    } 
}