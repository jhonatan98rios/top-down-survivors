import { Player } from "../models/Player";
import { XPOrb } from "../models/XPOrb";

export class OrbService {

    private static instance: OrbService;

    player: Player
    xpObs: XPOrb[]

    constructor() {
        this.player = Player.getInstance()
        this.xpObs = []
    }

    spawnXpOrb({ x, y }: Partial<XPOrb>) {
        this.xpObs.push(
            new XPOrb({ x, y })
        )       
        this.sortOrbs()        
    }

    sortOrbs() {
        this.xpObs.sort((a, b) => {
            const distanceToA = Math.sqrt(Math.pow(this.player.x - a.x, 2) + Math.pow(this.player.y - a.y, 2));
            const distanceToB = Math.sqrt(Math.pow(this.player.x - b.x, 2) + Math.pow(this.player.y - b.y, 2));
            return distanceToA - distanceToB;
        });
    }

    public static getInstance(): OrbService {
        if (!OrbService.instance) {
            OrbService.instance = new OrbService()
        }
    
        return OrbService.instance
    } 
}